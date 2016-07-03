import {Component, Input, OnChanges} from '@angular/core';
import {Player} from "../../data.types";
import {VideoBehaviourDirective} from "../../attribute-directives/video.behaviour.directive";
import {DomSanitizationService} from "@angular/platform-browser";

@Component({
    selector: 'post-video',
    directives: [VideoBehaviourDirective],
    template: `
        <div [innerHTML]="player" videoBehaviour></div>
    `
})
export class PostVideoComponent implements OnChanges{
    @Input('postPlayers') players: Player[];
    private player;

    constructor(private _sanitizer: DomSanitizationService) {}

    ngOnChanges(){
        this.player = this._sanitizer.bypassSecurityTrustHtml(this.players[this.players.length - 1].embed_code);
    }
}