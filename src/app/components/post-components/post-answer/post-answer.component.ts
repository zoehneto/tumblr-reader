import { Component, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Post } from '../../../data-types';

@Component({
    selector: 'post-answer',
    template: `
        <div class="question">
            <p *ngIf="!post.asking_url" class="asking">{{post.asking_name}} asked:</p>
            <p *ngIf="post.asking_url" class="asking">
                <a [tumblrLink]="post.asking_url">{{post.asking_name}}</a> asked:
            </p>
            <p class="question-text">{{post.question}}</p>
        </div>
        <div class="answer" [innerHTML]="post.answer" tumblrLink tumblrEmbeddedImage></div>
    `,
    styleUrls: ['./post-answer.component.scss']
})
export class PostAnswerComponent implements OnChanges {
    @Input('post') post: Post;
    constructor(private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.detectorRef.detectChanges();
    }
}
