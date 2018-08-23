import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../../data-types';
import {FullscreenService} from '../../../services/fullscreen.service';
import {SettingsService} from '../../../services/settings.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'post-photo',
    template: `
        <div *ngFor="let photo of postPhotos">
            <div *ngIf="!loadPhotos && photo.original_size.url.endsWith('.gif'); else showPhotos"
                 switch-target (click)="enablePhotoLoading()" class="placeholder"
                 [tumblrImage]="photo">
                <div class="center">
                    <h1>GIF</h1>
                    <p>Click to play</p>
                </div>
            </div>
            <ng-template #showPhotos>
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
            </ng-template>
        </div>
    `,
    styleUrls: ['./post-photo.component.scss']
})
export class PostPhotoComponent implements OnInit {
    @Input('postPhotos') postPhotos: Photo[];
    @Input('play') play: Observable<void>;
    @Input('loadAllowed') loadAllowed: boolean;
    @Input('loadFinished') loadFinished: () => void;
    loadPhotos: boolean;
    private loadCounter: number = 0;
    private errorCounter: number = 0;

    constructor(private fullscreenService: FullscreenService, private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.settingsService.getGifClickToPlay()
            .subscribe(gifClickToPlayEnabled => {
                if (!this.loadPhotos) {
                    this.loadPhotos = !gifClickToPlayEnabled;
                }
            });
        this.play.subscribe(play => this.loadPhotos = true);
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

    enablePhotoLoading() {
        this.loadPhotos = true;
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
        const photosToLoad = this.postPhotos
            .filter(photo => this.loadPhotos || !photo.original_size.url.endsWith('.gif')).length;
        if (this.loadCounter + this.errorCounter === photosToLoad) {
            this.loadFinished();
        }
    }
}
