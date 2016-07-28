import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Directive({ selector: '[postScroll]' })
export class PostScrollDirective implements OnDestroy {
    private hotkeys: Hotkey[];
    constructor(el: ElementRef, private hotkeysService: HotkeysService) {
        this.hotkeys = [
            new Hotkey('j', (event: KeyboardEvent): boolean => {
                this.showNextPost(el);
                return false;
            }), new Hotkey('k', (event: KeyboardEvent): boolean => {
                this.showPreviousPost(el);
                return false;
            })
        ];
        hotkeysService.add(this.hotkeys);
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
    }

    private showPreviousPost(el: ElementRef) {
        this.showPost(el, -1);
    }

    private showNextPost(el: ElementRef) {
        this.showPost(el, 1);
    }

    private showPost(el: ElementRef, modifier: number) {
        let items = this.getItems(el);
        let topVisibleIndex = this.getTopVisibleIndex(items);
        if (topVisibleIndex !== null) {
            let itemIndex = topVisibleIndex + modifier;
            if (itemIndex > -1 && itemIndex < items.length) {
                this.scrollToElement(items[itemIndex]);
            }
        }
    }

    private getItems(el: ElementRef): HTMLElement[] {
        return Array.prototype.slice.call(el.nativeElement.children);
    }

    private getTopVisibleIndex(elements: HTMLElement[]): number {
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
    };

    private scrollToElement(item: HTMLElement) {
        window.document.body.scrollTop += item.getBoundingClientRect().top;
    }
}
