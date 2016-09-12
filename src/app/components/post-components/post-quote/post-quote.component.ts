import { Component, Input } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-quote',
    template: `
        <blockquote>
            <h2>{{post.text}}</h2>
        </blockquote>
        <div [innerHTML]="post.source"></div>
    `,
    styleUrls: ['./post-quote.component.scss']
})
export class PostQuoteComponent {
    @Input('post') post: Post;
}
