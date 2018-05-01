import { GapiModuleWithServices } from "@gapi/core";
import { MicroserviceInterface } from './microservice.interface';
export declare class GapiMicroserviceModule {
    static forRoot(microservices: MicroserviceInterface[]): GapiModuleWithServices;
}
export * from './proxy.service';
export * from './microservice.interface';
