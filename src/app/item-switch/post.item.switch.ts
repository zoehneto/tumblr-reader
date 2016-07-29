import { Injectable } from '@angular/core';
import { ItemSwitch } from './item.switch';

@Injectable()
export class PostItemSwitch extends ItemSwitch<HTMLElement> {
    protected getCurrentItemIndex(elements: HTMLElement[]): number {
        let clientRects: ClientRect[] = elements.map(element => element.getBoundingClientRect());
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
        return elements.length === 0 ? null : elements.length - 1;
    }

    protected moreItemsNeeded(items: HTMLElement[]): boolean {
        return items[items.length - 1].getBoundingClientRect().bottom < window.innerHeight;
    }

    protected switchToItem(element: HTMLElement) {
        window.document.body.scrollTop += element.getBoundingClientRect().top;
    }
}
