import { Component, Input } from '@angular/core';
import { Post, Blog } from '../../../data.types';

@Component({
    selector: 'post-meta',
    template: `
        <p class="source" *ngIf="post.source_url  || post.reblogged_from_name">
            (<span *ngIf="post.source_url">
                Source: <a [tumblrLink]="post.source_url">{{post.source_title}}</a>
            </span>
            <span *ngIf="post.source_url && post.reblogged_from_name">, 
            </span>
            <span *ngIf="post.reblogged_from_name">
                via <a [tumblrLink]="post.reblogged_from_url">{{post.reblogged_from_name}}</a>
            </span>)
        </p>
        
        <ul *ngIf="post.tags.length > 0" class="list-inline">
            <li *ngFor="let tag of post.tags">
                <a target="_blank" [routerLink]="['/blog', blog.name, 'tag', tag]">#{{tag}}</a>
            </li>
        </ul>
        
        <p class="bottom">
            <a *ngIf="post.reblogs.length > 0" (click)="toggleReblogs()">{{post.reblogs.length}}
             {{post.reblogs.length > 1 ? 'reblogs' : 'reblog'}}</a>
            <a *ngIf="post.replies.length > 0" (click)="toggleReplies()">{{post.replies.length}}
             {{post.replies.length > 1 ? 'replies' : 'reply'}}</a>
            <span class="text" *ngIf="post.likes > 0">{{post.likes}}
             {{post.likes > 1 ? 'likes' : 'like'}}</span>
            <span class="text">{{post.date | date}}</span>
        </p>
                
        <post-reblogs *ngIf="post.reblogs.length > 0 && showReblogs" [post]="post"></post-reblogs>
        
        <post-replies *ngIf="post.replies.length > 0 && showReplies" [post]="post"></post-replies>
    `,
    styleUrls: ['./post-meta.component.scss']
})
export class PostMetaComponent {
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
    showReblogs: boolean;
    showReplies: boolean;
    constructor() {
        this.showReblogs = false;
        this.showReplies = false;
    }

    toggleReblogs() {
        this.showReblogs = !this.showReblogs;
    }

    toggleReplies() {
        this.showReplies = !this.showReplies;
    }
}
