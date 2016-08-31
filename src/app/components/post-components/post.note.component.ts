import { Component, Input, OnChanges } from '@angular/core';
import { Post, Note } from '../../data.types';

@Component({
    selector: 'post-note',
    template: `
        <p>Likes: {{likes}}</p>
        
        <div *ngIf="replies.length > 0" class="replies">
            <hr>
            <div *ngFor="let reply of replies">
                <p><a [tumblrLink]="reply.blog_url">{{reply.blog_name}}</a></p>
                <p>{{reply.reply_text}}</p>
            </div>
        </div>
        
        <div *ngIf="reblogs.length > 0" class="reblogs">
            <hr>
            <div *ngFor="let reblog of reblogs">
                <p>
                    <a [tumblrLink]="reblog.blog_url + 'post/' + reblog.post_id">
                        {{reblog.blog_name}}
                    </a>
                    rebloged this from
                    <a [tumblrLink]="'http://' + reblog.reblog_parent_blog_name + '.tumblr.com'">
                    {{reblog.reblog_parent_blog_name}}</a>
                </p>
            </div>
        </div>
    `,
    styles: [`

    `]
})
export class PostNoteComponent implements OnChanges {
    @Input('post') post: Post;
    likes: number;
    reblogs: Note[];
    replies: Note[];

    ngOnChanges() {
        this.likes = 0;
        this.reblogs = [];
        this.replies = [];

        this.post.notes.forEach(note => {
            if (note.type === 'like') {
                this.likes++;
            }
            if (note.type === 'reblog') {
                this.reblogs.push(note);
            }
            if (note.type === 'reply') {
                this.replies.push(note);
            }
        });
    }
}
