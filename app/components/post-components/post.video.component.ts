import {Component, Input} from '@angular/core';
import {Player} from "../../data.types";
import {VideoBehaviourDirective} from "../../attribute-directives/video.behaviour.directive";

@Component({
    selector: 'post-video',
    directives: [VideoBehaviourDirective],
    template: `
        <div [innerHTML]="players[players.length - 1].embed_code" videoBehaviour></div>
    `
})
export class PostVideoComponent{
    @Input('postPlayers') players: Player[];
}