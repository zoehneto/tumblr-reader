import {Component, Input} from '@angular/core';
import {Post} from "../../data.types";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";

@Component({
    selector: 'post-text',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <div *ngIf="post.body" class="body" [innerHTML]="post.body" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.body {
            margin: -1em 0;
        }
    `]
})
export class PostTextComponent{
    @Input('post') post: Post;
}