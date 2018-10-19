import {Injectable} from '@angular/core';

@Injectable()
export class FaviconService {
    public setFavicon(url: string) {
        const link = document.createElement('link');
        const oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'shortcut icon';
        link.href = url;
        if (document.head) {
            if (oldLink) {
                document.head.removeChild(oldLink);
            }
            document.head.appendChild(link);
        }
    }
}
