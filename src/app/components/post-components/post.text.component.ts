import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../data.types';
import { TumblrLinkDirective } from '../../attribute-directives/tumblr.link.directive';
import { TumblrEmbeddedImageDirective }
from '../../attribute-directives/tumblr.embedded.image.directive';
import { CustomSanitizationService } from '../../shared/custom.sanitization.service';

@Component({
    selector: 'post-text',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <div *ngIf="post.body" class="body" [innerHTML]="body" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.body {
            margin: -1em 0;
        }
    `]
})
export class PostTextComponent implements OnChanges {
    @Input('post') post: Post;
    private body: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.body = this.sanitizationService.sanitize(this.post.body);
        this.detectorRef.detectChanges();
    }
}
