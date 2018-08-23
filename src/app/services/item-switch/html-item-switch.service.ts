import { Injectable } from '@angular/core';
import { ItemSwitch } from './item-switch';
import { CurrentPostService } from '../current-post.service';

@Injectable()
export class HtmlItemSwitchService extends ItemSwitch<HTMLElement> {
    constructor(private currentPostService: CurrentPostService) {
        super();
    }

    protected getCurrentItemIndex(elements: HTMLElement[]): number | null {
        return this.currentPostService.getCurrentPostIndex(elements);
    }

    protected moreItemsNeeded(items: HTMLElement[], currentItemIndex: number,
        nextItemIndex: number): boolean {
        return currentItemIndex === items.length - 1 ||
            items[items.length - 1].getBoundingClientRect().bottom < window.innerHeight;
    }

    protected switchToItem(element: HTMLElement) {
        const firstFocusableChildElement = <HTMLElement | null> element.querySelector(
            '.focus-target');
        if (firstFocusableChildElement) {
            firstFocusableChildElement.focus();
        }

        // Use documentElement as fallback in IE
        const scrollingElement = document.scrollingElement || document.documentElement;
        if (scrollingElement) {
            scrollingElement.scrollTop += Math.ceil(element.getBoundingClientRect().top);
        }
    }
}
