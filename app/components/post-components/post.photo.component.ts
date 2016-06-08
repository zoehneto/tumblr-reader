import {Component, Input} from '@angular/core';
import {TumblrImageDirective} from "../../attribute-directives/tumblr.image.directive";
import {Photo} from "../../data.types";

@Component({
    selector: 'post-photo',
    directives: [TumblrImageDirective],
    template: `
        <div>
            <img *ngFor="let photo of photos" [tumblrImage]="photo">
        </div>
    `,
    styles: [`        
        img{
            width: 100%;
        }
    `]
})
export class PostPhotoComponent{
    @Input('postPhotos') photos: Photo[];
}