import { Service, Inject, GraphQLSchema, GapiServerModule, Container, ConfigService } from '@gapi/core';
import { mergeSchemas, introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { createHttpLink } from 'apollo-link-http';
import { MicroserviceInterface } from './microservice.interface';
const fetch = require('node-fetch');

@Service()
export class ProxyService {

  constructor(
    @Inject('gapi-microservice-config') private microservices: MicroserviceInterface[]
  ) {}

  public async getSchemaIntrospection(): Promise<GraphQLSchema> {
    return await this.mergeSchemas(await Promise.all(this.microservices.map(ep => {
      console.log(`Microservice: ${ep.name} loaded!`);
      return this.getIntrospectSchema(ep.link);
    })));
  }

  private mergeSchemas(allSchemas): GraphQLSchema {
    return mergeSchemas({ schemas: allSchemas });
  }

  private async getIntrospectSchema(uri): Promise<GraphQLSchema> {
    const makeDatabaseServiceLink = () => createHttpLink({ uri, fetch });
    return makeRemoteExecutableSchema({ schema: await introspectSchema(makeDatabaseServiceLink()), link: makeDatabaseServiceLink() });
  }

}