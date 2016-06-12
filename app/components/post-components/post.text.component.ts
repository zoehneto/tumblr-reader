import {Component, Input} from '@angular/core';
import {Post, Blog} from "../../data.types";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";

@Component({
    selector: 'post-text',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <h2 *ngIf="post.title" class="post-title">{{post.title}}</h2>
        <div *ngIf="post.body" class="body" [innerHTML]="post.body" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        h2.post-title{
            margin-top: 0;
            padding-bottom: 0.5em;
        }
        
        div.body {
            margin-top: -1em;
        }
    `]
})
export class PostTextComponent{
    @Input('post') post: Post;
}