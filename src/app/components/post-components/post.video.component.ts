import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { VideoPlayer } from '../../data.types';
import { VideoBehaviourDirective } from '../../attribute-directives/video.behaviour.directive';
import { CustomSanitizationService } from '../../shared/custom.sanitization.service';
import { IframeBehaviourDirective } from '../../attribute-directives/iframe.behaviour.directive';

@Component({
    selector: 'post-video',
    directives: [VideoBehaviourDirective, IframeBehaviourDirective],
    template: `
        <div [innerHTML]="player" videoBehaviour iframeBehaviour></div>
    `
})
export class PostVideoComponent implements OnChanges {
    @Input('postPlayers') postPlayers: VideoPlayer[];
    private player: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.player = this.sanitizationService.sanitize(
            this.postPlayers[this.postPlayers.length - 1].embed_code);
        this.detectorRef.detectChanges();
    }
}
