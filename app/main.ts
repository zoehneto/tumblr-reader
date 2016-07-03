import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from "@angular/http";
import 'rxjs/add/operator/map';
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {enableProdMode} from '@angular/core';
import {Title} from "@angular/platform-browser";

enableProdMode();
bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, JSONP_PROVIDERS, Title
]).catch(err => console.error(err));