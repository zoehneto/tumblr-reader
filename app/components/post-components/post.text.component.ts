import {Component, Input, OnChanges} from '@angular/core';
import {Post} from "../../data.types";
import {TumblrLinkDirective} from "../../attribute-directives/tumblr.link.directive";
import {TumblrEmbeddedImageDirective} from "../../attribute-directives/tumblr.embedded.image.directive";
import {DomSanitizationService} from "@angular/platform-browser";

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
    private body;

    constructor(private _sanitizer: DomSanitizationService) {}

    ngOnChanges(){
        this.body = this.post.body?this._sanitizer.bypassSecurityTrustHtml(this.post.body):null;
    }
}