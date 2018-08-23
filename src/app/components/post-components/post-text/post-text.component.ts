import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../../data-types';
import { CustomSanitizationService } from '../../../services/custom-sanitization.service';

@Component({
    selector: 'post-text',
    template: `
        <div *ngIf="post.body" class="body" [innerHTML]="body" tumblrLink tumblrEmbeddedImage></div>
    `,
    styleUrls: ['./post-text.component.scss']
})
export class PostTextComponent implements OnChanges {
    @Input('post') post: Post;
    body: any;
    constructor(private sanitizationService: CustomSanitizationService,
                private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.body = this.sanitizationService.sanitize(this.post.body);
        this.detectorRef.detectChanges();
    }
}
