import {Component, Input, OnChanges} from '@angular/core';
import {CustomSanitizationService} from "../../shared/custom.sanitization.service";

@Component({
    selector: 'post-audio',
    template: `
        <div [innerHTML]="player"></div>
    `
})
export class PostAudioComponent implements OnChanges{
    @Input('postPlayer') postPlayer: string;
    private player: any;

    constructor(private _sanitizer: CustomSanitizationService) {}

    ngOnChanges(){
        this.player = this._sanitizer.sanitize(this.postPlayer);
    }
}