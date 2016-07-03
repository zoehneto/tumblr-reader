import {Component, Input, OnChanges} from '@angular/core';
import {Post} from "../../data.types";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";
import {DomSanitizationService} from "@angular/platform-browser";
import {CustomSanitizationService} from "../../shared/custom.sanitization.service";

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
export class PostTextComponent implements OnChanges{
    @Input('post') post: Post;
    private body: any;

    constructor(private _sanitizer: CustomSanitizationService) {}

    ngOnChanges(){
        this.body = this._sanitizer.sanitize(this.post.body);
    }
}