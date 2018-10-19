import {Injectable} from '@angular/core';

@Injectable()
export class FullscreenService {
    public requestFullscreen(element: HTMLElement) {
        const elementAny = <any> element;
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
        const documentAny = <any>document;
        if (documentAny.fullscreenElement !== null && documentAny.fullscreenElement !== undefined) {
            return true;
        }
        if (documentAny.webkitIsFullScreen) {
            return true;
        }
        if (documentAny.mozFullScreen) {
            return true;
        }
        return false;
    }
}
