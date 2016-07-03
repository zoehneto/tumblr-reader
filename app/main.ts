import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from "@angular/http";
import 'rxjs/add/operator/map';
import {NO_SANITIZATION_PROVIDERS} from "./shared/no.sanitization.service";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, JSONP_PROVIDERS, NO_SANITIZATION_PROVIDERS
]).catch(err => console.error(err));