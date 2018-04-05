import { GraphQLSchema } from '@gapi/core';
import { MicroserviceInterface } from './microservice.interface';
export declare class ProxyService {
    private microservices;
    constructor(microservices: MicroserviceInterface[]);
    getSchemaIntrospection(): Promise<GraphQLSchema>;
    private mergeSchemas(allSchemas);
    private getIntrospectSchema(uri);
}
