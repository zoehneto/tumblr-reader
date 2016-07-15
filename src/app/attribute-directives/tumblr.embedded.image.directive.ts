import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[tumblrEmbeddedImage]' })
export class TumblrEmbeddedImageDirective implements DoCheck{
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        let imageElements = this.el.nativeElement.querySelectorAll("img");
        if(imageElements.length > 0){
            for(let imageElement of imageElements){
                imageElement.parentElement.style.marginLeft = 0;
                imageElement.parentElement.style.marginRight = 0;
                imageElement.setAttribute("width","100%");
            }
        }
    }
}