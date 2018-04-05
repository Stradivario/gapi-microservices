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
let GapiMicroserviceModule = GapiMicroserviceModule_1 = class GapiMicroserviceModule {
    static forRoot(microservices) {
        core_1.Container.set('gapi-microservice-config', microservices);
        core_1.Container.get(core_1.ConfigService).APP_CONFIG.schema = core_1.Container.get(proxy_service_1.ProxyService).getSchemaIntrospection();
        return GapiMicroserviceModule_1;
    }
};
GapiMicroserviceModule = GapiMicroserviceModule_1 = __decorate([
    core_1.GapiModule({})
], GapiMicroserviceModule);
exports.GapiMicroserviceModule = GapiMicroserviceModule;
__export(require("./proxy.service"));
var GapiMicroserviceModule_1;
