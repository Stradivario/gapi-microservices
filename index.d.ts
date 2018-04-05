import { MicroserviceInterface } from './microservice.interface';
export declare class GapiMicroserviceModule {
    static forRoot(microservices: MicroserviceInterface[]): typeof GapiMicroserviceModule;
}
export * from './proxy.service';
export * from './microservice.interface';
