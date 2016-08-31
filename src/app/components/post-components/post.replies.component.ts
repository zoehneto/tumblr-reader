import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-replies',
    template: `
        <ul>
            <li *ngFor="let reply of post.replies">
                <a [tumblrLink]="reply.blog_url">{{reply.blog_name}}</a> said: {{reply.reply_text}}
            </li>
        </ul>
    `,
    styles: [`
        ul {
            margin: 1em 0 0 0;
            padding: 0;
            list-style: none;
        }
        
        li {
            padding: 1em 0;
            border-bottom: 1px solid #6E6E6E;
        }
        
        li:last-of-type {
            border-bottom: none;
            padding-bottom: 0;
        }
    `]
})
export class PostRepliesComponent {
    @Input('post') post: Post;
}
