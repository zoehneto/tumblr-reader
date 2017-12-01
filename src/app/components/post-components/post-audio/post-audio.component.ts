import { Component, Input } from '@angular/core';
import { Post } from '../../../data.types';

@Component({
    selector: 'post-audio',
    template: `
        <div switch-target>
            <audio class="pure-u-1" [src]="post.audio_url" preload="metadata" controls>
            </audio>
        </div>
    `,
    styleUrls: ['./post-audio.component.scss']
})
export class PostAudioComponent {
    @Input('post') post: Post;
}
