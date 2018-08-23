import {Component, Input, OnInit} from '@angular/core';
import {Post, Blog} from '../../../data-types';
import {Subject} from 'rxjs';
import {SmartLoadingService} from '../../../services/smart-loading.service';

@Component({
    selector: 'complete-post',
    template: `
        <focus-target></focus-target>
        <div class="full">
            <post-photo *ngIf="post.photos" [postPhotos]="post.photos" [play]="playSubject"
                        [loadAllowed]="loadAllowed" [loadFinished]="resolveFunction">
            </post-photo>
            <post-video *ngIf="post.type == 'video'" [post]="post" [play]="playSubject">
            </post-video>
            <post-audio *ngIf="post.type == 'audio'" [post]="post" [play]="playSubject">
            </post-audio>
        </div>
        <div switch-target class="padded">
            <post-title *ngIf="post.title && post.type != 'link'" [post]="post"></post-title>

            <post-answer *ngIf="post.type == 'answer'" [post]="post"></post-answer>

            <post-quote *ngIf="post.type == 'quote'" [post]="post"></post-quote>

            <post-chat *ngIf="post.type == 'chat'" [post]="post"></post-chat>

            <post-link *ngIf="post.type == 'link'" [post]="post"></post-link>

            <post-caption *ngIf="post.caption" [post]="post"></post-caption>

            <post-text *ngIf="post.type == 'text' && post.body" [post]="post">
            </post-text>

            <post-meta class="meta" [blog]="blog" [post]="post"></post-meta>
        </div>
    `,
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
    @Input('index') index: number;
    playSubject: Subject<void> = new Subject<void>();
    loadAllowed: boolean = false;
    resolveFunction: () => void;

    constructor(private smartLoadingService: SmartLoadingService) {
    }

    ngOnInit(): void {
        this.smartLoadingService.register(this.index, () => {
            if (this.post.photos) {
                const promise = new Promise<void>(resolve => this.resolveFunction = resolve);
                this.loadAllowed = true;
                return promise;
            }
            return Promise.resolve();
        });
    }

    public play(): void {
        this.playSubject.next();
    }


}
