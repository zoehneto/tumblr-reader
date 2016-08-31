import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-reblogs',
    template: `
        <ul>
            <li *ngFor="let reblog of post.reblogs">
                <a [tumblrLink]="reblog.blog_url + 'post/' + reblog.post_id">
                 {{reblog.blog_name}}</a>
                reblogged this from
                <a [tumblrLink]="'http://' + reblog.reblog_parent_blog_name + '.tumblr.com'">
                 {{reblog.reblog_parent_blog_name}}</a>
                <span *ngIf="reblog.added_text">and added: "{{reblog.added_text}}"</span>
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
export class PostReblogsComponent {
    @Input('post') post: Post;
}
