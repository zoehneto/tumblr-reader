import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { VideoPlayer } from '../../../data.types';
import { CustomSanitizationService } from '../../../shared/custom.sanitization.service';

@Component({
    selector: 'post-video',
    template: `
        <div [innerHTML]="player" videoBehaviour embedBehaviour></div>
    `,
    styleUrls: ['./post-video.component.scss']
})
export class PostVideoComponent implements OnChanges {
    @Input('postPlayers') postPlayers: VideoPlayer[];
    player: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.player = this.sanitizationService.sanitize(
            this.postPlayers[this.postPlayers.length - 1].embed_code);
        this.detectorRef.detectChanges();
    }
}
