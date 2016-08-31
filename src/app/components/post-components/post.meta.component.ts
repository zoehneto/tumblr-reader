import { Component, Input } from '@angular/core';
import { Post, Blog } from '../../data.types';

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
            <a class="notes" *ngIf="post.note_count > 0">{{post.note_count}} notes</a>
            <span class="date">{{post.date | date}}</span>
        </p>
        
        <post-note *ngIf="post.note_count > 0" [post]="post"></post-note>
    `,
    styles: [`
        p.source{
            margin-top: 0;
        }
        
        ul{
            margin-bottom: 1em;
            padding: 0;
            list-style: none;
        }

        .list-inline > li{
            display: inline-block;
            margin: 0;
            padding-left: 0;
            padding-right: 1em;
        }
        
        a.notes {
            margin-right: 0.7em;
        }
        
        span.date{
            color: #6E6E6E;
        }
        
        p.bottom {
            margin: 0;
        }
    `]
})
export class PostMetaComponent {
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
}
