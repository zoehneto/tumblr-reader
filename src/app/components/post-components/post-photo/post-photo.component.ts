import { Component, Input } from '@angular/core';
import { Photo } from '../../../data.types';
import { FullscreenService } from '../../../shared/fullscreen.service';

@Component({
    selector: 'post-photo',
    template: `
        <img switch-target *ngFor="let photo of postPhotos" (click)="fullScreen($event)"
        src="{{photo.original_size.url}}" sizes="(min-width: 100em) 26vw, (min-width: 64em) 34vw,
        (min-width: 48em) 73vw, 95vw" [srcset]="createSrcSet(photo)"
        [tumblrImage]="photo">
    `,
    styleUrls: ['./post-photo.component.scss']
})
export class PostPhotoComponent {
    @Input('postPhotos') postPhotos: Photo[];
    constructor(private fullscreenService: FullscreenService) {
    }

    createSrcSet(photo: Photo): string {
        if (photo.alt_sizes.length === 0) {
            return photo.original_size.url;
        }

        let srcset = '';
        photo.alt_sizes.forEach(picture => {
            srcset += picture.url + ' ' + picture.width + 'w, ';
        });
        return srcset.substring(0, srcset.lastIndexOf(', '));
    }

    fullScreen(event: any) {
        const elem = event.currentTarget;
        this.fullscreenService.requestFullscreen(elem);
    }
}
