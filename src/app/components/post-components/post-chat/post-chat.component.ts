import { Component, Input } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-chat',
    template: `
        <p *ngFor="let message of post.dialogue">
            <span class="label">{{message.label}}</span> {{message.phrase}}
        </p>
    `,
    styleUrls: ['./post-chat.component.scss']
})
export class PostChatComponent {
    @Input('post') post: Post;
}
