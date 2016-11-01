import { ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { HtmlItemSwitch } from '../item-switch/html.item.switch';

export abstract class PostSwitch implements OnInit, OnDestroy {
    @Input('loadMoreItems') loadMoreItems: () => Promise<any>;
    private hotkeys: Hotkey[];
    private el: ElementRef;
    private hotkeysService: HotkeysService;
    private htmlItemSwitch: HtmlItemSwitch;
    private nextKey: string;
    private previousKey: string;
    constructor(el: ElementRef, hotkeysService: HotkeysService,
                htmlItemSwitch: HtmlItemSwitch, nextKey: string, previousKey: string) {
        this.el = el;
        this.hotkeysService = hotkeysService;
        this.htmlItemSwitch = htmlItemSwitch;
        this.nextKey = nextKey;
        this.previousKey = previousKey;
    }

    ngOnInit() {
        this.htmlItemSwitch.setLoadMoreItemsCallback(this.moreItemsNeeded.bind(this));
        this.hotkeys = [
            new Hotkey(this.nextKey, (event: KeyboardEvent): boolean => {
                this.htmlItemSwitch.showNextItem(this.getElements(this.el));
                return false;
            }), new Hotkey(this.previousKey, (event: KeyboardEvent): boolean => {
                this.htmlItemSwitch.showPreviousItem(this.getElements(this.el));
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
        return [].concat.apply([], array);
    }
}
