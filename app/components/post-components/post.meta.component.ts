import {Component, Input} from '@angular/core';
import {Post, Blog} from "../../data.types";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";

@Component({
    selector: 'post-meta',
    directives: [ROUTER_DIRECTIVES, TumblrLinkDirective],
    template: `
        <div>
            <p *ngIf="post.source_url">(Source: <a [tumblrLink]="post.source_url">{{post.source_title}}</a>)</p>
            
            <div>
                <ul class="list-inline">
                    <li *ngFor="let tag of post.tags">
                        <a target="_blank" [routerLink]="['/blog-details', blog.name, 'tag', tag]">#{{tag}}</a>
                    </li>
                </ul>
            </div>
            
            <div class="date">
                {{post.date | date}}
            </div>
        </div>
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
        
        div.date{
            margin-top: 1em;
            color: #6E6E6E;
        }
    `]
})
export class PostMetaComponent{
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
}