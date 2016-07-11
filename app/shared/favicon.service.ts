import {Injectable} from '@angular/core';

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