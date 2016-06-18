import {Component, Input} from '@angular/core';
import {Post, Blog} from "../../data.types";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";

@Component({
    selector: 'post-answer',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <div class="question">
            <p *ngIf="!post.asking_url">{{post.asking_name}} asked:</p>
            <p *ngIf="post.asking_url"><a [tumblrLink]="post.asking_url">{{post.asking_name}}</a> asked:</p>
            <p>{{post.question}}</p>
        </div>
        <div [innerHTML]="post.answer" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.question{
            padding: 0.5em 1em;
            border-radius: 4px;
            background-color: lightgrey;
        }
    `]
})
export class PostAnswerComponent{
    @Input('post') post: Post;
}