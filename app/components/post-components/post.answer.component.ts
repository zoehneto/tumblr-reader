import {Component, Input} from '@angular/core';
import {Post} from "../../data.types";
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
        <div class="answer" [innerHTML]="post.answer" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.question{
            padding: 0.5em 1em;
            border-radius: 4px;
            background-color: lightgrey;
        }
        
        div.answer{
            margin-bottom: -1em;
        }
    `]
})
export class PostAnswerComponent{
    @Input('post') post: Post;
}