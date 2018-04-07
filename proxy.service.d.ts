import { AuthService, GraphQLSchema } from '@gapi/core';
import { MicroserviceInterface } from './microservice.interface';
export declare class ProxyService {
    private microservices;
    private authService;
    constructor(microservices: MicroserviceInterface[], authService: AuthService);
    getSchemaIntrospection(): Promise<GraphQLSchema>;
    private mergeSchemas(allSchemas);
    private getIntrospectSchema(microservice);
}
