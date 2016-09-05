import { Component, Input } from '@angular/core';
import { Photo } from '../../../data.types';
import { FullscreenService } from '../../../shared/fullscreen.service';

@Component({
    selector: 'post-photo',
    template: `
        <img *ngFor="let photo of postPhotos" (click)="fullScreen($event)"
        src="{{photo.alt_sizes[0].url}}" sizes="(min-width: 64em) 34vw,
        (min-width: 48em) 73vw, 95vw" [srcset]="createSrcSet(photo)"
        [tumblrImage]="photo">
    `,
    styleUrls: ['./post-photo.component.scss']
})
export class PostPhotoComponent {
    @Input('postPhotos') postPhotos: Photo[];
    constructor(private fullscreenService: FullscreenService) {
    }

    private createSrcSet(photo: Photo): string {
        let srcset: string = '';
        photo.alt_sizes.forEach(picture => {
            srcset += picture.url + ' ' + picture.width + 'w, ';
        });
        return srcset.substring(0, srcset.lastIndexOf(', '));
    }

    private fullScreen(event: any) {
        let elem = event.currentTarget;
        this.fullscreenService.requestFullscreen(elem);
    }
}
