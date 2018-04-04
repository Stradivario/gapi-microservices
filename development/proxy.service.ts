import { Service, Inject } from '@gapi/core';
import { mergeSchemas, introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { createHttpLink } from 'apollo-link-http';
import { MicroserviceInterface } from './microservice.interface';
const fetch = require('node-fetch');

@Service()
export class ProxyService {

  constructor(
     @Inject('gapi-microservice-config') private microservices: MicroserviceInterface[] 
  ) {}

  public async getSchemaIntrospection() {
    return await this.mergeSchemas(await Promise.all(this.microservices.map(ep => {
        console.log(`Microservice: ${ep.name} loaded!`);
        return this.getIntrospectSchema(ep.link);
    })));
  }

  private mergeSchemas(allSchemas) {
    return mergeSchemas({ schemas: allSchemas });
  }

  private async getIntrospectSchema(uri) {
    const makeDatabaseServiceLink = () => createHttpLink({uri, fetch});
    return makeRemoteExecutableSchema({ schema: await introspectSchema(makeDatabaseServiceLink()), link: makeDatabaseServiceLink()});
  }

}