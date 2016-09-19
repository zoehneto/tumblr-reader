import { Component, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-link',
    template: `
        <a [tumblrLink]="post.url">
            <post-title [post]="post"></post-title>
        </a>
        <p *ngIf="post.excerpt">{{post.excerpt}}</p>
        <div *ngIf="post.description" [innerHTML]="post.description" 
        tumblrLink tumblrEmbeddedImage></div>
    `,
    styleUrls: ['./post-link.component.scss']
})
export class PostLinkComponent implements OnChanges {
    @Input('post') post: Post;
    constructor(private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.detectorRef.detectChanges();
    }
}
