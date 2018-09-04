import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../../data-types';
import {FullscreenService} from '../../../services/fullscreen.service';
import {LoadingHandler} from '../../../services/smart-loading/loading-handler';
import {SmartLoadingService} from '../../../services/smart-loading/smart-loading.service';

@Component({
    selector: 'post-photo',
    template: `
        <div *ngFor="let photo of postPhotos">
            <img *ngIf="loadingHandler.loadAllowed" switch-target (click)="fullScreen($event)"
                 (load)="loadingHandler.elementLoadSuccess($event)"
                 (error)="loadingHandler.elementLoadError($event)"
                 [src]="photo.original_size.url" sizes="(min-width: 100em) 26vw,
                 (min-width: 64em) 34vw, (min-width: 48em) 73vw, 95vw"
                 [srcset]="createSrcSet(photo)" [tumblrImage]="photo">
            <div *ngIf="!loadingHandler.loadAllowed" switch-target class="placeholder" [tumblrImage]="photo">
                <div class="center">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./post-photo.component.scss']
})
export class PostPhotoComponent implements OnInit {
    @Input('postPhotos') postPhotos: Photo[];
    @Input('index') index: number;
    loadingHandler: LoadingHandler;

    constructor(private fullscreenService: FullscreenService, private smartLoadingService: SmartLoadingService) {
    }

    ngOnInit(): void {
        this.loadingHandler = new LoadingHandler(this.postPhotos.length);
        this.smartLoadingService.register(this.index, this.loadingHandler);
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
}
