import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Post} from '../../../data-types';
import {Observable} from 'rxjs';
import {LoadingHandler} from '../../../services/smart-loading/loading-handler';
import {SmartLoadingService} from '../../../services/smart-loading/smart-loading.service';

@Component({
    selector: 'post-audio',
    template: `
        <div switch-target>
            <audio *ngIf="loadingHandler.loadAllowed" class="pure-u-1" [src]="post.audio_url" preload="metadata" controls
                   (loadedmetadata)="loadingHandler.elementLoadSuccess($event)"
                   (error)="loadingHandler.elementLoadError($event)">
            </audio>
            <div *ngIf="!loadingHandler.loadAllowed" class="placeholder">
                <div class="center">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./post-audio.component.scss']
})
export class PostAudioComponent implements OnInit {
    @Input('post') post: Post;
    @Input('play') play: Observable<void>;
    @Input('index') index: number;
    loadingHandler: LoadingHandler;

    constructor(private el: ElementRef, private smartLoadingService: SmartLoadingService) {
    }

    ngOnInit() {
        this.loadingHandler = new LoadingHandler(1);
        this.smartLoadingService.register(this.index, this.loadingHandler);

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
