"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const proxy_service_1 = require("./proxy.service");
const defaultConfig = [
    { name: 'microservice1', link: 'http://localhost:10000/graphql' },
    { name: 'microservice2', link: 'http://localhost:10001/graphql' }
];
let GapiMicroserviceModule = GapiMicroserviceModule_1 = class GapiMicroserviceModule {
    static forRoot(microservices = defaultConfig) {
        core_1.Container.set('gapi-microservice-config', microservices);
        return GapiMicroserviceModule_1;
    }
};
GapiMicroserviceModule = GapiMicroserviceModule_1 = __decorate([
    core_1.GapiModule({
        imports: [
            core_1.GapiServerModule.forRoot(Object.assign({}, core_1.Container.get(core_1.ConfigService).APP_CONFIG, { schema: core_1.Container.get(proxy_service_1.ProxyService).getSchemaIntrospection() }))
        ],
        services: [
            proxy_service_1.ProxyService
        ]
    })
], GapiMicroserviceModule);
exports.GapiMicroserviceModule = GapiMicroserviceModule;
__export(require("./proxy.service"));
var GapiMicroserviceModule_1;
