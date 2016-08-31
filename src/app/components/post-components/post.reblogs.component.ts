import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-reblogs',
    template: `
        <hr>
        <div *ngFor="let reblog of post.reblogs">
            <p>
                <a [tumblrLink]="reblog.blog_url + 'post/' + reblog.post_id">
                 {{reblog.blog_name}}</a>
                reblogged this from
                <a [tumblrLink]="'http://' + reblog.reblog_parent_blog_name + '.tumblr.com'">
                 {{reblog.reblog_parent_blog_name}}</a>
                <span *ngIf="reblog.added_text">and added: "{{reblog.added_text}}"</span>
            </p>
        </div>
    `,
    styles: [`

    `]
})
export class PostReblogsComponent {
    @Input('post') post: Post;
}
