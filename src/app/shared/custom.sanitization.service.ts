import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CustomSanitizationService {
    constructor(private sanitizationService: DomSanitizer) {
    }

    public sanitize(html: string) {
        if (/iframe/i.test(html) || /embed/i.test(html) ) {
            return this.sanitizationService.bypassSecurityTrustHtml(html);
        }else {
            return html;
        }
    }
}
