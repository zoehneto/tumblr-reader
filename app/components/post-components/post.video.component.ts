import {Component, Input, OnChanges} from '@angular/core';
import {VideoPlayer} from "../../data.types";
import {VideoBehaviourDirective} from "../../attribute-directives/video.behaviour.directive";
import {CustomSanitizationService} from "../../shared/custom.sanitization.service";

@Component({
    selector: 'post-video',
    directives: [VideoBehaviourDirective],
    template: `
        <div [innerHTML]="player" videoBehaviour></div>
    `
})
export class PostVideoComponent implements OnChanges{
    @Input('postPlayers') players: VideoPlayer[];
    private player: any;

    constructor(private _sanitizer: CustomSanitizationService) {}

    ngOnChanges(){
        this.player = this._sanitizer.sanitize(this.players[this.players.length - 1].embed_code);
    }
}