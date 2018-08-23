import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[videoBehaviour]' })
export class VideoBehaviourDirective implements DoCheck {
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        const videoElements = this.el.nativeElement.getElementsByTagName('video');
        if (videoElements.length > 0) {
            for (const videoElement of videoElements) {
                videoElement.setAttribute('controls', '');
                videoElement.setAttribute('width', '100%');
                videoElement.setAttribute('height', '');
                videoElement.removeAttribute('muted');
            }
        }
    }
}
