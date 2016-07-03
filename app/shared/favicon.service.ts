import {Injectable} from '@angular/core';
import {Blog} from "../data.types";
import {localforage} from "../data.types";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {DomSanitizationService} from "@angular/platform-browser";

@Injectable()
export class FaviconService {
    public setFavicon(url: string){
        var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'shortcut icon';
        link.href = url;
        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
    }
}