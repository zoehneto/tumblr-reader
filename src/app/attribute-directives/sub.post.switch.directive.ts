import { ElementRef, Directive } from '@angular/core';
import { HotkeysService } from 'angular2-hotkeys';
import { HtmlItemSwitch } from '../item-switch/html.item.switch';
import { PostSwitch } from './post.switch';

@Directive({ selector: '[subPostSwitch]' })
export class SubPostSwitchDirective extends PostSwitch {
    constructor(el: ElementRef, hotkeysService: HotkeysService,
                htmlItemSwitch: HtmlItemSwitch) {
        super(el, hotkeysService, htmlItemSwitch, 'n', 'm');
    }

    protected getElements(el: ElementRef): HTMLElement[] {
        return this.flatten(this.toArray(el.nativeElement.children).map((element: HTMLElement) => {
            return this.toArray(element.querySelectorAll('*[switch-target]'));
        }));
    };
}
