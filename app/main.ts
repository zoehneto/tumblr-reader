import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from "@angular/http";
import 'rxjs/add/operator/map';

bootstrap(AppComponent, [HTTP_PROVIDERS]);