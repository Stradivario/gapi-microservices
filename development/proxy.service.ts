import { AuthService, Service, Inject, GraphQLSchema, GapiServerModule, Container, ConfigService } from '@gapi/core';
import { mergeSchemas, introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { createHttpLink } from 'apollo-link-http';
import { MicroserviceInterface } from './microservice.interface';
const fetch = require('node-fetch');

@Service()
export class ProxyService {

  constructor(
    @Inject('gapi-microservice-config') private microservices: MicroserviceInterface[],
    private authService: AuthService
  ) {}

  public async getSchemaIntrospection(): Promise<GraphQLSchema> {
    return await this.mergeSchemas(await Promise.all(this.microservices.map(ep => {
      console.log(`Microservice: ${ep.name} loaded!`);
      return this.getIntrospectSchema(ep);
    })));
  }

  private mergeSchemas(allSchemas): GraphQLSchema {
    return mergeSchemas({ schemas: allSchemas });
  }

  private async getIntrospectSchema(microservice: MicroserviceInterface): Promise<GraphQLSchema> {
    const authorizationToken = this.authService.sign({
      email: microservice.name,
      id: -1,
      scope: ['ADMIN']
    });
    const makeDatabaseServiceLink = () => createHttpLink({ uri: microservice.link, fetch, headers: {authorization: authorizationToken} });
    return makeRemoteExecutableSchema({ schema: await introspectSchema(makeDatabaseServiceLink()), link: makeDatabaseServiceLink() });
  }

}