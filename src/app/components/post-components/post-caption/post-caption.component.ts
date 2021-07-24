import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../../data-types';
import { CustomSanitizationService } from '../../../services/custom-sanitization.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'post-caption',
    template: `
        <div class="caption" [innerHTML]="caption" tumblrLink tumblrEmbeddedMedia></div>
    `,
    styleUrls: ['./post-caption.component.scss']
})
export class PostCaptionComponent implements OnChanges {
    @Input() post: Post;
    caption: string | SafeHtml;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        if (this.post.caption) {
            this.caption = this.sanitizationService.sanitize(this.post.caption);
        }
        this.detectorRef.detectChanges();
    }
}
