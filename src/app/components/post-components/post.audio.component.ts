import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CustomSanitizationService } from '../../shared/custom.sanitization.service';

@Component({
    selector: 'post-audio',
    template: `
        <div [innerHTML]="player" iframeBehaviour></div>
    `
})
export class PostAudioComponent implements OnChanges {
    @Input('postPlayer') postPlayer: string;
    private player: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.player = this.sanitizationService.sanitize(this.postPlayer);
        this.detectorRef.detectChanges();
    }
}
