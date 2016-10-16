import { Component, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-link',
    template: `
        <a *ngIf="post.title" [tumblrLink]="post.url">
            <post-title [post]="post"></post-title>
        </a>
        <p *ngIf="post.excerpt">{{post.excerpt}}</p>
        <div *ngIf="post.description && post.title" [innerHTML]="post.description"
        tumblrLink tumblrEmbeddedImage></div>
        <a *ngIf="post.description && !post.title" [tumblrLink]="post.url">
            <div [innerHTML]="post.description" tumblrLink tumblrEmbeddedImage></div>
        </a>
        <a *ngIf="post.publisher && !post.description && !post.title" [tumblrLink]="post.url">
            <div [innerHTML]="post.publisher" tumblrLink tumblrEmbeddedImage></div>
        </a>
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
