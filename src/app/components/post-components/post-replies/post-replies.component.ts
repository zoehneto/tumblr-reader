import { Component, Input } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-replies',
    template: `
        <ul>
            <li *ngFor="let reply of post.replies">
                <a [tumblrLink]="reply.blog_url">{{reply.blog_name}}</a> said: {{reply.reply_text}}
            </li>
        </ul>
    `,
    styleUrls: ['./post-replies.component.scss']
})
export class PostRepliesComponent {
    @Input('post') post: Post;
}
