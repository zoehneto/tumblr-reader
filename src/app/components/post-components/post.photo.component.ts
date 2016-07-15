import {Component, Input} from '@angular/core';
import {TumblrImageDirective} from "../../attribute-directives/tumblr.image.directive";
import {Photo} from "../../data.types";

@Component({
    selector: 'post-photo',
    directives: [TumblrImageDirective],
    template: `
        <img *ngFor="let photo of photos" (click)="fullScreen($event)" src="{{photo.alt_sizes[photo.alt_sizes.length - 1].url}}" 
        [srcset]="createSrcSet(photo)" [tumblrImage]="photo">
    `,
    styles: [`
        /*TODO add support for non webkit version*/
        img:not(:-webkit-full-screen){
            display: block;
            width: 100%;
        }
    `]
})
export class PostPhotoComponent{
    @Input('postPhotos') photos: Photo[];

    private createSrcSet(photo: Photo): string {
        let srcset: string = "";
        photo.alt_sizes.forEach(picture => {
            srcset += picture.url + " " + picture.width + "w, "
        });
        return srcset.substring(0, srcset.lastIndexOf(", "));
    }

    private fullScreen(event: any){
        let elem = event.currentTarget;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
}