import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PostAnswerComponent } from './post.answer.component';
import { PostLinkComponent } from './post.link.component';
import { PostTextComponent } from './post.text.component';
import { PostChatComponent } from './post.chat.component';
import { PostQuoteComponent } from './post.quote.component';
import { PostCaptionComponent } from './post.caption.component';
import { PostTitleComponent } from './post.title.component';
import { PostAudioComponent } from './post.audio.component';
import { Post, Blog } from '../../data.types';
import { PostPhotoComponent } from './post.photo.component';
import { PostVideoComponent } from './post.video.component';
import { PostMetaComponent } from './post.meta.component';

@Component({
    selector: 'complete-post',
    directives: [ROUTER_DIRECTIVES, PostPhotoComponent, PostVideoComponent, PostAudioComponent,
        PostTitleComponent, PostAnswerComponent, PostQuoteComponent, PostChatComponent,
        PostLinkComponent, PostCaptionComponent, PostTextComponent, PostMetaComponent],
    template: `
        <div class="full">
            <post-photo *ngIf="post.photos" [postPhotos]="post.photos">
            </post-photo>
            <post-video *ngIf="post.type == 'video'" [postPlayers]="post.player">
            </post-video>
            <post-audio *ngIf="post.type == 'audio'" [postPlayer]="post.player">
            </post-audio>
        </div>
        <div class="padded">
            <post-title *ngIf="post.title" [post]="post"></post-title>
        
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
    styles: [`
        div.padded{
            padding: 1em;
        }
        
        div.padded *{
            display: block;
        }
        
        div.padded *:not(:first-child){
            padding-top: 1em;
        }
        
        div.padded post-meta.meta:not(:first-child){
            padding-top: 2em;
        }
    `]
})
export class PostComponent {
    @Input('blog') blog: Blog;
    @Input('post') post: Post;
}
