import {Component, Input, OnChanges} from '@angular/core';
import {Post} from "../../data.types";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";
import {CustomSanitizationService} from "../../shared/custom.sanitization.service";

@Component({
    selector: 'post-caption',
    directives: [TumblrLinkDirective, TumblrEmbeddedImageDirective],
    template: `
        <div class="caption" [innerHTML]="caption" tumblrLink tumblrEmbeddedImage></div>
    `,
    styles: [`
        div.caption{
            margin: -1em 0;
        }
    `]
})
export class PostCaptionComponent implements OnChanges{
    @Input('post') post: Post;
    private caption: any;
    constructor(private sanitizationService: CustomSanitizationService) {}

    ngOnChanges(){
        this.caption = this.sanitizationService.sanitize(this.post.caption);
    }
}