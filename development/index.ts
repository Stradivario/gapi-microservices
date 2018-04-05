import { GapiModule, Container, Token, GapiServerModule, ConfigService } from "@gapi/core";
import { ProxyService } from "./proxy.service";
import { MicroserviceInterface } from './microservice.interface';

@GapiModule({})
export class GapiMicroserviceModule {
    static forRoot(microservices: MicroserviceInterface[]) {
        Container.set('gapi-microservice-config', microservices);
        Container.get(ConfigService).APP_CONFIG.schema = Container.get(ProxyService).getSchemaIntrospection();
        return GapiMicroserviceModule;
    }
}

export * from './proxy.service';
export * from './microservice.interface';
