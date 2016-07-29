import { Directive, ElementRef, OnDestroy, Input, OnInit } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { PostItemSwitch } from '../item-switch/post.item.switch';

@Directive({ selector: '[postSwitch]' })
export class PostSwitchDirective implements OnInit, OnDestroy {
    @Input('loadMoreItemsCallback') loadMoreItemsCallback: Function;
    private hotkeys: Hotkey[];
    private el: ElementRef;
    constructor(el: ElementRef, private hotkeysService: HotkeysService,
                private postItemSwitch: PostItemSwitch) {
        this.el = el;
    }

    ngOnInit() {
        this.postItemSwitch.setLoadMoreItemsCallback(this.loadMoreItemsCallback);
        this.hotkeys = [
            new Hotkey('j', (event: KeyboardEvent): boolean => {
                this.postItemSwitch.showNextItem(this.getElements(this.el));
                return false;
            }), new Hotkey('k', (event: KeyboardEvent): boolean => {
                this.postItemSwitch.showPreviousItem(this.getElements(this.el));
                return false;
            })
        ];
        this.hotkeysService.add(this.hotkeys);
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
    }

    private getElements(el: ElementRef): HTMLElement[] {
        return Array.prototype.slice.call(el.nativeElement.children);
    }
}
