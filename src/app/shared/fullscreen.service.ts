import { Injectable } from '@angular/core';

@Injectable()
export class FullscreenService {
    public requestFullscreen(element: HTMLElement) {
        let elementAny = <any> element;
        if (elementAny.requestFullscreen) {
            elementAny.requestFullscreen();
        }
        if (elementAny.webkitRequestFullscreen) {
            elementAny.webkitRequestFullscreen();
        }
        if (elementAny.msRequestFullscreen) {
            elementAny.msRequestFullscreen();
        }
        if (elementAny.mozRequestFullscreen) {
            elementAny.mozRequestFullscreen();
        }
    }

    public isFullscreen(): boolean {
        if (document.fullscreenElement !== null && document.fullscreenElement !== undefined) {
            return true;
        }
        if (document.webkitIsFullScreen) {
            return true;
        }
        if ((<any>document).mozFullScreen) {
            return true;
        }
        return false;
    }
}
