import {Component, Input} from '@angular/core';
import {Photo} from '../../../data-types';
import {FullscreenService} from '../../../services/fullscreen.service';

@Component({
    selector: 'post-photo',
    template: `
        <div *ngFor="let photo of postPhotos">
            <img *ngIf="loadAllowed" switch-target (click)="fullScreen($event)" (load)="handleLoading($event)"
                 (error)="handleLoading($event)"
                 [src]="photo.original_size.url" sizes="(min-width: 100em) 26vw,
                 (min-width: 64em) 34vw, (min-width: 48em) 73vw, 95vw"
                 [srcset]="createSrcSet(photo)" [tumblrImage]="photo">
            <div *ngIf="!loadAllowed" switch-target class="placeholder" [tumblrImage]="photo">
                <div class="center">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./post-photo.component.scss']
})
export class PostPhotoComponent {
    @Input('postPhotos') postPhotos: Photo[];
    @Input('loadAllowed') loadAllowed: boolean;
    @Input('loadFinished') loadFinished: () => void;
    private loadCounter: number = 0;
    private errorCounter: number = 0;

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
        const elem = <HTMLElement> event.currentTarget;
        this.fullscreenService.requestFullscreen(elem);
        elem.setAttribute('height', '');
    }

    handleLoading(event: any) {
        if (event.type === 'load') {
            this.loadCounter++;
        } else {
            this.errorCounter++;
        }

        if (this.loadCounter + this.errorCounter === this.postPhotos.length) {
            this.loadFinished();
        }
    }
}
