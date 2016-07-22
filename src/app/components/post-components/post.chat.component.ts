import { Component, Input } from '@angular/core';
import { Post } from '../../data.types';

@Component({
    selector: 'post-chat',
    template: `
        <p *ngFor="let message of post.dialogue">
            <span class="label">{{message.label}}</span> {{message.phrase}}
        </p>
    `,
    styles: [`
        p{
            margin: 0.5em 0;
            padding: 1em 0 1em 1em;
            background-color: #eee;
            border-radius: 4px;
        }
        
        p:first-child{
            margin-top: 0;
        }
        
        p:last-child{
            margin-bottom: 0;
        }
        
        p:nth-child(odd){
            background-color: #ddd;
        }
        
        span.label{
            font-weight: 700;
        }
    `]
})
export class PostChatComponent {
    @Input('post') post: Post;
}
