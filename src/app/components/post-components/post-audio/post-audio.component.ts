import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../data.types';
import { Observable } from 'rxjs/Observable';

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
export class PostAudioComponent implements OnInit {
    @Input('post') post: Post;
    @Input('play') play: Observable<void>;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.play.subscribe(play => {
            const player: HTMLAudioElement = this.el.nativeElement.querySelector('audio');
            const paused = player.paused;
            if (paused) {
                player.play();
            } else {
                player.pause();
            }
        });
    }
}
