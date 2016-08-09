import { Component, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Post } from '../../data.types';

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
    styles: [`
        div.question{
            padding: 1em;
            border-radius: 4px;
            background-color: lightgrey;
        }
        
        p.asking{
            margin-top: 0;
        }
        
        p.question-text{
            margin-bottom: 0;
        }
        
        div.answer{
            margin-bottom: -1em;
        }
    `]
})
export class PostAnswerComponent implements OnChanges {
    @Input('post') post: Post;
    constructor(private detectorRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.detectorRef.detectChanges();
    }
}
