import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-replies',
    template: `
        <hr>
        <div *ngFor="let reply of post.replies">
            <p><a [tumblrLink]="reply.blog_url">{{reply.blog_name}}</a></p>
            <p>{{reply.reply_text}}</p>
        </div>
    `,
    styles: [`

    `]
})
export class PostRepliesComponent {
    @Input('post') post: Post;
}
