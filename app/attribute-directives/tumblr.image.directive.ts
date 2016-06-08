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
        this.el.nativeElement.setAttribute("height", this.getHeight())
    }

    private getHeight(): string {
        let ratio = this.photo.original_size.height / this.photo.original_size.width;
        return Math.round(100 * ratio) + "%";
    }
}