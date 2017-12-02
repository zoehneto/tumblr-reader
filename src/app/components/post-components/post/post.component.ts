import { Component, Input } from '@angular/core';
import { Post, Blog } from '../../../data.types';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'complete-post',
    template: `
        <div class="full">
            <post-photo *ngIf="post.photos" [postPhotos]="post.photos" [play]="playSubject">
            </post-photo>
            <post-video *ngIf="post.type == 'video'" [post]="post" [play]="playSubject">
            </post-video>
            <post-audio *ngIf="post.type == 'audio'" [post]="post" [play]="playSubject">
            </post-audio>
        </div>
        <div switch-target class="padded">
            <post-title *ngIf="post.title && post.type != 'link'" [post]="post"></post-title>

            <post-answer *ngIf="post.type == 'answer'" [post]="post"></post-answer>

            <post-quote *ngIf="post.type == 'quote'" [post]="post"></post-quote>

            <post-chat *ngIf="post.type == 'chat'" [post]="post"></post-chat>

            <post-link *ngIf="post.type == 'link'" [post]="post"></post-link>

            <post-caption *ngIf="post.caption" [post]="post"></post-caption>

            <post-text *ngIf="post.type == 'text' && post.body" [post]="post">
            </post-text>

            <post-meta class="meta" [blog]="blog" [post]="post"></post-meta>
        </div>
    `,
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
    playSubject: Subject<void> = new Subject<void>();

    public play(): void {
        this.playSubject.next();
    }
}
