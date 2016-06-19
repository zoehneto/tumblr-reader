import {Component, Input} from '@angular/core';
import {Post} from "../../data.types";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";

@Component({
    selector: 'post-caption',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <div class="caption" [innerHTML]="post.caption" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.caption{
            margin: -1em 0;
        }
    `]
})
export class PostCaptionComponent{
    @Input('post') post: Post;
}