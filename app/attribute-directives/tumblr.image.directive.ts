import { Directive, ElementRef, Input } from '@angular/core';
import {Photo} from "../data.types";

@Directive({ selector: '[tumblrImage]' })
export class TumblrImageDirective{
    @Input('tumblrImage') photo: Photo;
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngOnInit(){
        this.el.nativeElement.setAttribute("src", this.photo.alt_sizes[this.photo.alt_sizes.length - 1].url);
        this.el.nativeElement.setAttribute("srcset", this.createSrcSet());
        this.el.nativeElement.setAttribute("height", this.getHeight(this.el.nativeElement.width))
    }

    private getHeight(width: number): string {
        let ratio = this.photo.original_size.height / this.photo.original_size.width;
        return Math.round(width * ratio) + "px";
    }

    private createSrcSet(): string {
        let srcset: string = "";
        this.photo.alt_sizes.forEach(picture => {
            srcset += picture.url + " " + picture.width + "w, "
        });
        return srcset.substring(0, srcset.lastIndexOf(", "));
    }
}