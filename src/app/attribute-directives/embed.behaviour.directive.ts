import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[embedBehaviour]' })
export class EmbedBehaviourDirective implements DoCheck {
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        let embeds = this.el.nativeElement.querySelectorAll('iframe, embed');
        if (embeds.length > 0) {
            for (let embed of embeds) {
                let width = parseInt(embed.getAttribute('width'), 10);
                let height = parseInt(embed.getAttribute('height'), 10);
                let ratio = height / width;
                let newWidth = embed.parentElement.clientWidth;

                embed.setAttribute('width', newWidth);
                embed.setAttribute('height', Math.round(newWidth * ratio));
            }
        }
    }
}
