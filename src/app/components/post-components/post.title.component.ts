import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-title',
    template: `
        <h2 class="post-title">{{post.title}}</h2>
    `,
    styles: [`
        h2.post-title{
            margin: 0;
            padding: 0;
        }
    `]
})
export class PostTitleComponent {
    @Input('post') post: Post;
}
