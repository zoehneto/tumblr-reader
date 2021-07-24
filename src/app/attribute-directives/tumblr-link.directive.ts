import {Directive, ElementRef, DoCheck, Input} from '@angular/core';

@Directive({selector: '[tumblrLink]'})
export class TumblrLinkDirective implements DoCheck {
    @Input() tumblrLink: string;
    private el: ElementRef;

    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        if (this.tumblrLink) {
            this.applySettings(this.el.nativeElement, this.tumblrLink);
        } else {
            const blogLinks = this.el.nativeElement.querySelectorAll('a');
            if (blogLinks.length > 0) {
                for (const blogLink of blogLinks) {
                    this.applySettings(blogLink, blogLink.getAttribute('href'));
                }
            }
        }
    }

    private applySettings(element: HTMLAnchorElement, link: string): void {
        const currentHref = element.getAttribute('href') || '';
        const newHref = this.getHref(link);
        if (element.innerText.trim().length > 0 && element.innerText.trim().toLowerCase() === currentHref.trim().toLowerCase()) {
            element.innerText = newHref;
        }
        element.setAttribute('href', newHref);
        element.setAttribute('target', '_blank');
    }

    private getHref(currentHref: string): string {
        // External link
        if (!currentHref || !currentHref.includes('tumblr.com') || currentHref.includes('t.umblr.com')
            || currentHref.includes('tumblr.com/follow')) {
            return currentHref;
        }

        currentHref = currentHref.replace('http://', '');
        currentHref = currentHref.replace('https://', '');

        const data = currentHref.split('.tumblr.com/post/');

        if (data.length < 2 || data[1].match(/\d+/) == null) {
            const blogName = currentHref.substring(0, currentHref.indexOf('.'));
            if (currentHref.includes('/tagged/')) {
                const tag = currentHref.split('.tumblr.com/tagged/')[1].replace(/\-/g, '%20');
                return '#/blog/' + blogName + '/tag/' + tag;
            }
            return '#/blog/' + blogName;
        }
        return '#/blog/' + data[0] + '/post/' + (data[1].match(/\d+/) || [])[0];
    }
}
