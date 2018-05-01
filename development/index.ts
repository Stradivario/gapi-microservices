import { GapiModule, Container, Token, GapiServerModule, ConfigService, GapiModuleWithServices } from "@gapi/core";
import { ProxyService } from "./proxy.service";
import { MicroserviceInterface } from './microservice.interface';

@GapiModule({})
export class GapiMicroserviceModule {
    static forRoot(microservices: MicroserviceInterface[]): GapiModuleWithServices {
        Container.set('gapi-microservice-config', microservices);
        Container.get(ConfigService).APP_CONFIG.schema = Container.get(ProxyService).getSchemaIntrospection();
        return {
            gapiModule: GapiMicroserviceModule,
            services: []
        };
    }
}

export * from './proxy.service';
export * from './microservice.interface';
