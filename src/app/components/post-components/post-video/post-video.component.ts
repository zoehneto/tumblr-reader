import { Component, Input, OnChanges, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { Post, VideoPlayer } from '../../../data.types';
import { CustomSanitizationService } from '../../../shared/custom.sanitization.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'post-video',
    template: `
        <div *ngIf="post.html5_capable === true && post.video_url" switch-target videoBehaviour>
            <video preload="metadata">
                <source src="{{post.video_url}}"/>
            </video>
        </div>
        <div *ngIf="post.html5_capable === true && !post.video_url" switch-target [innerHTML]="player" videoBehaviour embedBehaviour></div>
        <div *ngIf="post.html5_capable === false" switch-target [innerHTML]="player" videoBehaviour embedBehaviour></div>
    `,
    styleUrls: ['./post-video.component.scss']
})
export class PostVideoComponent implements OnInit, OnChanges {
    @Input('post') post: Post;
    @Input('play') play: Observable<void>;
    player: any;
    constructor(private el: ElementRef, private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.post.html5_capable) {
            this.play.subscribe(play => {
                const player: HTMLVideoElement = this.el.nativeElement.querySelector('video');
                const paused = player.paused;
                if (paused) {
                    player.play();
                    this.detectorRef.detectChanges();
                } else {
                    player.pause();
                }
            });
        }
    }

    ngOnChanges() {
        const largestPlayer: VideoPlayer = <VideoPlayer> this.post.player![this.post.player!.length - 1];
        if (!this.post.html5_capable || !this.post.video_url) {
            this.player = this.sanitizationService.sanitize(largestPlayer.embed_code);
        }
        this.detectorRef.detectChanges();
    }
}
