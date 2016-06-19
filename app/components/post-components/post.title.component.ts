import {Component, Input} from '@angular/core';
import {Post} from "../../data.types";

@Component({
    selector: 'post-title',
    template: `
        <h2 class="post-title">{{post.title}}</h2>
    `,
    styles: [`
        h2.post-title{
            margin-top: 0;
            padding-bottom: 0.5em;
        }
    `]
})
export class PostTitleComponent{
    @Input('post') post: Post;
}