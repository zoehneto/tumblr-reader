import {Component, Input} from '@angular/core';
import {Post} from "../../data.types";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";

@Component({
    selector: 'post-link',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <a href="{{post.url}}">{{post.title}}</a>
        <div [innerHTML]="post.description" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
    `]
})
export class PostLinkComponent{
    @Input('post') post: Post;
}