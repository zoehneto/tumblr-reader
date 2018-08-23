import { Component, Input } from '@angular/core';
import { Post } from '../../../data-types';

@Component({
    selector: 'post-title',
    template: `
        <h2 class="post-title">{{post.title}}</h2>
    `,
    styleUrls: ['./post-title.component.scss']
})
export class PostTitleComponent {
    @Input('post') post: Post;
}
