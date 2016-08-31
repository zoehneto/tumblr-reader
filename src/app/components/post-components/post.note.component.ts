import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-note',
    template: `
        <p>Likes: {{likes}}</p>
        
        <div *ngIf="post.replies.length > 0" class="replies">
            <hr>
            <div *ngFor="let reply of post.replies">
                <p><a [tumblrLink]="reply.blog_url">{{reply.blog_name}}</a></p>
                <p>{{reply.reply_text}}</p>
            </div>
        </div>
        
        <div *ngIf="post.reblogs.length > 0" class="reblogs">
            <hr>
            <div *ngFor="let reblog of post.reblogs">
                <p>
                    <a [tumblrLink]="reblog.blog_url + 'post/' + reblog.post_id">
                        {{reblog.blog_name}}
                    </a>
                    rebloged this from
                    <a [tumblrLink]="'http://' + reblog.reblog_parent_blog_name + '.tumblr.com'">
                    {{reblog.reblog_parent_blog_name}}</a>
                    <span *ngIf="reblog.added_text">and added: "{{reblog.added_text}}"</span>
                </p>
            </div>
        </div>
    `,
    styles: [`

    `]
})
export class PostNoteComponent {
    @Input('post') post: Post;
}
