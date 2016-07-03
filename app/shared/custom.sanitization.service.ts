import {Injectable} from '@angular/core';
import {Blog} from "../data.types";
import {localforage} from "../data.types";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {DomSanitizationService} from "@angular/platform-browser";

@Injectable()
export class CustomSanitizationService {
    constructor(private _sanitizer: DomSanitizationService) {}
    
    public sanitize(html: string){
        if(/iframe/i.test(html)) {
            return this._sanitizer.bypassSecurityTrustHtml(html);
        }else{
            return html;
        }
    }
}