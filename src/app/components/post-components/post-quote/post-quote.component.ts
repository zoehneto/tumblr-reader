import {Component, Input, ViewChild, ElementRef, DoCheck, ChangeDetectorRef} from '@angular/core';
import { Post } from '../../../data-types';

@Component({
    selector: 'post-quote',
    template: `
        <blockquote>
            <h2 #quote [innerHTML]="post.text"></h2>
        </blockquote>
        <div [innerHTML]="post.source" tumblrLink></div>
    `,
    styleUrls: ['./post-quote.component.scss']
})
export class PostQuoteComponent implements DoCheck {
    @Input('post') post: Post;
    @ViewChild('quote', {static: true}) quote: ElementRef;

    constructor(private detectorRef: ChangeDetectorRef) {}

    ngDoCheck() {
        if (this.quote.nativeElement.children.length > 0) {
            this.quote.nativeElement.classList.add('no-margin');
        } else {
            this.quote.nativeElement.classList.remove('no-margin');
        }
        this.detectorRef.detectChanges();
    }
}
