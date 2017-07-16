import { ElementRef, Directive } from '@angular/core';
import { HotkeysService } from 'angular2-hotkeys';
import { HtmlItemSwitch } from '../item-switch/html.item.switch';
import { PostSwitch } from './post.switch';

@Directive({ selector: '[postSwitch]' })
export class PostSwitchDirective extends PostSwitch {
    constructor(el: ElementRef, hotkeysService: HotkeysService,
                htmlItemSwitch: HtmlItemSwitch) {
        super(el, hotkeysService, htmlItemSwitch, 'j', 'k');
    }

    protected getElements(el: ElementRef): HTMLElement[] {
        return this.toArray(el.nativeElement.children);
    }
}
