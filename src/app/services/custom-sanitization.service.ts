import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Injectable()
export class CustomSanitizationService {
    constructor(private sanitizationService: DomSanitizer) {
    }

    public sanitize(html: string): string | SafeHtml {
        if (/iframe/i.test(html) || /embed/i.test(html) ) {
            html = DOMPurify.sanitize(html, {ADD_TAGS: ['iframe', 'embed'], FORBID_ATTR: ['style']});
            return this.sanitizationService.bypassSecurityTrustHtml(html);
        } else {
            return html;
        }
    }
}
