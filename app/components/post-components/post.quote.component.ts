import {Component, Input} from '@angular/core';
import {Post} from "../../data.types";

@Component({
    selector: 'post-quote',
    template: `
        <p>{{post.text}}</p>
        <div [innerHTML]="post.source"></div>
    `,
    styles: [`
        p{
            margin-top: 0;
        }
    `]
})
export class PostQuoteComponent{
    @Input('post') post: Post;
}