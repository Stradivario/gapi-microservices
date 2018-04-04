import { GapiModule, Container, Token, GapiServerModule, ConfigService } from "@gapi/core";
import { ProxyService } from "./proxy.service";
import { MicroserviceInterface } from './microservice.interface';

const defaultConfig = [
    {name: 'microservice1', link: 'http://localhost:10000/graphql'},
    {name: 'microservice2', link: 'http://localhost:10001/graphql'}
];

@GapiModule({
    imports: [
        GapiServerModule.forRoot({
            ...Container.get(ConfigService).APP_CONFIG,
            schema: Container.get(ProxyService).getSchemaIntrospection()
        })
    ],
    services: [
        ProxyService
    ]
})
export class GapiMicroserviceModule {
    static forRoot(microservices: MicroserviceInterface[] = defaultConfig) {
        Container.set('gapi-microservice-config', microservices)
        return GapiMicroserviceModule;
    }
}

export * from './proxy.service';
export * from './microservice.interface';
