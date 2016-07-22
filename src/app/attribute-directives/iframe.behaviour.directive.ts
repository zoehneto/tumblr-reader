import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[iframeBehaviour]' })
export class IframeBehaviourDirective implements DoCheck {
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        let iframeElements = this.el.nativeElement.getElementsByTagName('iframe');
        if (iframeElements.length > 0) {
            for (let iframeElement of iframeElements){
                let width = parseInt(iframeElement.getAttribute('width'), 10);
                let height = parseInt(iframeElement.getAttribute('height'), 10);
                let ratio = height / width;
                let newWidth = iframeElement.parentElement.clientWidth;

                iframeElement.setAttribute('width', newWidth);
                iframeElement.setAttribute('height', Math.round(newWidth * ratio));
            }
        }
    }
}
