import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';
import { TumblrLinkDirective } from '../../attribute-directives/tumblr.link.directive';
import { TumblrEmbeddedImageDirective }
from '../../attribute-directives/tumblr.embedded.image.directive';

@Component({
    selector: 'post-link',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <a [tumblrLink]="post.url">{{post.title}}</a>
        <p *ngIf="post.excerpt">{{post.excerpt}}</p>
        <div *ngIf="post.description" [innerHTML]="post.description" 
        tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div{
            margin-bottom: -1em;
        }
    `]
})
export class PostLinkComponent {
    @Input('post') post: Post;
}
