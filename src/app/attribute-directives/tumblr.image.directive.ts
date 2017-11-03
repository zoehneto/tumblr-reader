import { Directive, ElementRef, Input, DoCheck } from '@angular/core';
import { Photo } from '../data.types';
import { FullscreenService } from '../shared/fullscreen.service';

@Directive({ selector: '[tumblrImage]' })
export class TumblrImageDirective implements DoCheck {
    @Input('tumblrImage') tumblrImage: Photo;
    private el: ElementRef;
    constructor(el: ElementRef, private fullscreenService: FullscreenService) {
        this.el = el;
    }

    ngDoCheck() {
        if (!this.el.nativeElement.hasAttribute('height') &&
            !this.fullscreenService.isFullscreen()) {
            this.el.nativeElement.setAttribute('height',
                this.getHeight(this.el.nativeElement.width));
        }
        if (this.el.nativeElement.hasAttribute('height') && this.fullscreenService.isFullscreen()) {
            this.el.nativeElement.setAttribute('height', '');
        }
    }

    private getHeight(width: number): string {
        const ratio = this.tumblrImage.original_size.height / this.tumblrImage.original_size.width;
        return Math.round(width * ratio) + 'px';
    }
}
