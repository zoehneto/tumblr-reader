import {Component, Input} from '@angular/core';
import {Post, Blog} from "../../data.types";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";

@Component({
    selector: 'post-meta',
    directives: [ROUTER_DIRECTIVES, TumblrLinkDirective],
    template: `
        <p *ngIf="post.source_url  || post.reblogged_from_name">
            (<span *ngIf="post.source_url">Source: <a [tumblrLink]="post.source_url">{{post.source_title}}</a></span><span *ngIf="post.source_url">, </span><span *ngIf="post.reblogged_from_name">via <a [tumblrLink]="post.reblogged_from_url">{{post.reblogged_from_name}}</a></span>)
        </p>
        
        <ul class="list-inline">
            <li *ngFor="let tag of post.tags">
                <a target="_blank" [routerLink]="['/blog-details', blog.name, 'tag', tag]">#{{tag}}</a>
            </li>
        </ul>
        
        <p class="date">{{post.date | date}}</p>
    `,
    styles: [`
        ul{
            padding: 0;
            list-style: none;
        }

        .list-inline > li{
            display: inline-block;
            margin: 0;
            padding-left: 0;
            padding-right: 1em;
        }
        
        p.date{
            margin-top: 1em;
            margin-bottom: 0;
            color: #6E6E6E;
        }
    `]
})
export class PostMetaComponent{
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
}