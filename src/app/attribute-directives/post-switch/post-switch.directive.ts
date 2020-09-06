import { ElementRef, Directive } from '@angular/core';
import { HotkeysService } from 'angular2-hotkeys';
import { HtmlItemSwitchService } from '../../services/item-switch/html-item-switch.service';
import { BasePostSwitchDirective } from './base-post-switch.directive';

@Directive({ selector: '[postSwitch]' })
export class PostSwitchDirective extends BasePostSwitchDirective {
    constructor(el: ElementRef, hotkeysService: HotkeysService,
                htmlItemSwitchService: HtmlItemSwitchService) {
        super(el, hotkeysService, htmlItemSwitchService, 'j', 'k');
    }

    protected getElements(el: ElementRef): HTMLElement[] {
        return this.toArray(el.nativeElement.children);
    }
}
