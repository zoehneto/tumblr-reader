import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../data.types';
import { CustomSanitizationService } from '../../shared/custom.sanitization.service';

@Component({
    selector: 'post-caption',
    template: `
        <div class="caption" [innerHTML]="caption" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.caption{
            margin: -1em 0;
        }
    `]
})
export class PostCaptionComponent implements OnChanges {
    @Input('post') post: Post;
    private caption: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.caption = this.sanitizationService.sanitize(this.post.caption);
        this.detectorRef.detectChanges();
    }
}
