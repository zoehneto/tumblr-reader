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
                mediaElement.parentElement.style.marginLeft = 0;
                mediaElement.parentElement.style.marginRight = 0;
                mediaElement.setAttribute('width', '100%');
                mediaElement.setAttribute('height', '');

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
