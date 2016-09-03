import { Component, Input } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-quote',
    template: `
        <p>{{post.text}}</p>
        <div [innerHTML]="post.source"></div>
    `,
    styleUrls: ['./post-quote.component.scss']
})
export class PostQuoteComponent {
    @Input('post') post: Post;
}
