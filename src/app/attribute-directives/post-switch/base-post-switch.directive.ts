import { ElementRef, OnDestroy, OnInit, Input, Directive } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { HtmlItemSwitchService } from '../../services/item-switch/html-item-switch.service';

@Directive()
export abstract class BasePostSwitchDirective implements OnInit, OnDestroy {
    @Input('loadMoreItems') loadMoreItems: () => Promise<any>;
    private hotkeys: Hotkey[];
    constructor(private el: ElementRef, private hotkeysService: HotkeysService,
                private htmlItemSwitchService: HtmlItemSwitchService, private nextKey: string, private previousKey: string) {}

    ngOnInit() {
        this.htmlItemSwitchService.setLoadMoreItemsCallback(this.moreItemsNeeded.bind(this));
        this.hotkeys = [
            new Hotkey(this.nextKey, (event: KeyboardEvent): boolean => {
                this.htmlItemSwitchService.showNextItem(this.getElements(this.el));
                return false;
            }), new Hotkey(this.previousKey, (event: KeyboardEvent): boolean => {
                this.htmlItemSwitchService.showPreviousItem(this.getElements(this.el));
                return false;
            })
        ];
        this.hotkeysService.add(this.hotkeys);
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
    }

    moreItemsNeeded(): Promise<HTMLElement[]> {
        return new Promise((resolve, reject) => {
           this.loadMoreItems()
               .then(() => resolve(this.getElements(this.el)))
               .catch(() => reject(this.getElements(this.el)));
        });
    }

    protected abstract getElements(el: ElementRef): HTMLElement[];

    protected toArray(collection: any): any[] {
        return Array.prototype.slice.call(collection);
    }

    protected flatten<T>(array: T[][]): T[] {
        return ([] as T[]).concat.apply([], array);
    }
}
