import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Post, VideoPlayer } from '../../../data.types';
import { CustomSanitizationService } from '../../../shared/custom.sanitization.service';

@Component({
    selector: 'post-video',
    template: `
        <div *ngIf="post.html5_capable === true" switch-target [innerHTML]="player" videoBehaviour></div>
        <div *ngIf="post.html5_capable === false" switch-target [innerHTML]="player" videoBehaviour embedBehaviour></div>
    `,
    styleUrls: ['./post-video.component.scss']
})
export class PostVideoComponent implements OnChanges {
    @Input('post') post: Post;
    player: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        const largestPlayer: VideoPlayer = <VideoPlayer> this.post.player[this.post.player.length - 1];
        if (this.post.html5_capable) {
            this.player = largestPlayer.embed_code;
        } else {
            this.player = this.sanitizationService.sanitize(largestPlayer.embed_code);
        }
        this.detectorRef.detectChanges();
    }
}
