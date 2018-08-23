import { Injectable } from '@angular/core';

@Injectable()
export class CurrentPostService {
    public getCurrentPostIndex(posts: HTMLElement[]): number | null {
        const clientRects: ClientRect[] = posts.map(element => element.getBoundingClientRect());
        for (let i = 0; i < clientRects.length; i++) {
            if (clientRects[i].top >= 0 && i === 0) {
                return i;
            }
            if (clientRects[i].top <= 0 && clientRects.length > i + 1
                && clientRects[i + 1].top > 0) {
                if (clientRects[i].bottom <= 0) {
                    return i + 1;
                }
                return i;
            }
        }
        return posts.length === 0 ? null : posts.length - 1;
    }
}
