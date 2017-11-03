import { Directive, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[embedBehaviour]' })
export class EmbedBehaviourDirective implements DoCheck {
    private el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngDoCheck() {
        const embeds = this.el.nativeElement.querySelectorAll('iframe, embed');
        if (embeds.length > 0) {
            for (const embed of embeds) {
                const width = parseInt(embed.getAttribute('width'), 10);
                const height = parseInt(embed.getAttribute('height'), 10);
                const ratio = height / width;
                const newWidth = embed.parentElement.clientWidth;

                embed.setAttribute('width', newWidth);
                embed.setAttribute('height', Math.round(newWidth * ratio));
            }
        }
    }
}
