import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from "@angular/http";
import 'rxjs/add/operator/map';
import {NO_SANITIZATION_PROVIDERS} from "./shared/no.sanitization.service";

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, NO_SANITIZATION_PROVIDERS]);