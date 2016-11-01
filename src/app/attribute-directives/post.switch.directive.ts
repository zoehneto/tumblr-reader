import { Directive, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { PostItemSwitch } from '../item-switch/post.item.switch';

@Directive({ selector: '[postSwitch]' })
export class PostSwitchDirective implements OnInit, OnDestroy {
    @Input('loadMoreItems') loadMoreItems: () => Promise<any>;
    private hotkeys: Hotkey[];
    private el: ElementRef;
    constructor(el: ElementRef, private hotkeysService: HotkeysService,
                private postItemSwitch: PostItemSwitch) {
        this.el = el;
    }

    ngOnInit() {
        this.postItemSwitch.setLoadMoreItemsCallback(this.moreItemsNeeded.bind(this));
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

    moreItemsNeeded(): Promise<HTMLElement[]> {
        return new Promise((resolve, reject) => {
           this.loadMoreItems()
               .then(() => resolve(this.getElements(this.el)))
               .catch(() => reject(this.getElements(this.el)));
        });
    }

    private getElements(el: ElementRef): HTMLElement[] {
        return Array.prototype.slice.call(el.nativeElement.children);
    }
}
