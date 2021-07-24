import {Component, Input, OnChanges, ChangeDetectorRef, ElementRef, OnInit} from '@angular/core';
import {Post, VideoPlayer} from '../../../data-types';
import {CustomSanitizationService} from '../../../services/custom-sanitization.service';
import {Observable} from 'rxjs';
import {LoadingHandler} from '../../../services/smart-loading/loading-handler';
import {SmartLoadingService} from '../../../services/smart-loading/smart-loading.service';

@Component({
    selector: 'post-video',
    template: `
        <div *ngIf="post.html5_capable === true && post.video_url" switch-target tumblrEmbeddedMedia>
            <video *ngIf="loadingHandler && loadingHandler.loadAllowed" preload="metadata"
                   (loadedmetadata)="loadingHandler.elementLoadSuccess($event)"
                   (error)="loadingHandler.elementLoadError($event)">
                <source src="{{post.video_url}}"/>
            </video>
            <div *ngIf="!loadingHandler || !loadingHandler.loadAllowed" class="placeholder">
                <div class="center">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
        <div *ngIf="post.html5_capable === true && !post.video_url" switch-target [innerHTML]="player" tumblrEmbeddedMedia
             embedBehaviour></div>
        <div *ngIf="post.html5_capable === false" switch-target [innerHTML]="player" tumblrEmbeddedMedia embedBehaviour></div>
    `,
    styleUrls: ['./post-video.component.scss']
})
export class PostVideoComponent implements OnInit, OnChanges {
    @Input() post: Post;
    @Input() play: Observable<void>;
    @Input() index: number;
    loadingHandler: LoadingHandler;
    player: any;

    constructor(private el: ElementRef, private sanitizationService: CustomSanitizationService,
                private smartLoadingService: SmartLoadingService, private detectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        const loadEnabledElements = (this.post.html5_capable === true && this.post.video_url) ? 1 : 0;
        this.loadingHandler = new LoadingHandler(loadEnabledElements);
        this.smartLoadingService.register(this.index, this.loadingHandler);

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
