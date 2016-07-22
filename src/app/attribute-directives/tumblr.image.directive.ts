import { Directive, ElementRef, Input, DoCheck } from '@angular/core';
import { Photo } from '../data.types';

@Directive({ selector: '[tumblrImage]' })
export class TumblrImageDirective implements DoCheck {
    @Input('tumblrImage') tumblrImage: Photo;
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        // TODO Abstract fullscreen api for browser independence
        if (!this.el.nativeElement.hasAttribute('height') && !document.webkitIsFullScreen) {
            this.el.nativeElement.setAttribute('height',
                this.getHeight(this.el.nativeElement.width));
        }
        if (this.el.nativeElement.hasAttribute('height') && document.webkitIsFullScreen) {
            this.el.nativeElement.setAttribute('height', '');
        }
    }

    private getHeight(width: number): string {
        let ratio = this.tumblrImage.original_size.height / this.tumblrImage.original_size.width;
        return Math.round(width * ratio) + 'px';
    }
}
