import {Directive, ElementRef, DoCheck} from '@angular/core';

@Directive({selector: '[tumblrEmbeddedMedia]'})
export class TumblrEmbeddedMediaDirective implements DoCheck {
    private el: ElementRef;

    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        const mediaElements = this.el.nativeElement.querySelectorAll('img, video');
        if (mediaElements.length > 0) {
            for (const mediaElement of mediaElements) {
                const parent = mediaElement.parentElement;

                // media embedded in a post
                if (parent.nodeName === 'FIGURE') {
                    parent.style.marginLeft = 0;
                    parent.style.marginRight = 0;

                    if (parent.nextSibling && parent.nextSibling.nodeName !== 'FIGURE' && parent.nextSibling.setAttribute) {
                        parent.nextSibling.setAttribute('switch-target', '');
                    }
                }

                mediaElement.setAttribute('width', '100%');
                mediaElement.setAttribute('height', '');
                mediaElement.setAttribute('switch-target', '');

                if (mediaElement.nodeName === 'VIDEO') {
                    mediaElement.removeAttribute('autoplay');
                    mediaElement.setAttribute('controls', '');
                    mediaElement.removeAttribute('muted');
                    mediaElement.setAttribute('preload', 'metadata');
                    mediaElement.muted = false;
                }
            }
        }
    }
}
