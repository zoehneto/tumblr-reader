import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {VideoBehaviourDirective} from "../attribute-directives/video.behaviour.directive";
import {TumblrImageDirective} from "../attribute-directives/tumblr.image.directive";
import {TumblrLinkDirective} from "../attribute-directives/tumblr.link.directive";
import {PostPhotoComponent} from "./post-components/post.photo.component";
import {PostVideoComponent} from "./post-components/post.video.component";
import {PostMetaComponent} from "./post-components/post.meta.component";
import {TumblrEmbeddedImageDirective} from "../attribute-directives/tumblr.embedded.image.directive";
import {PostTextComponent} from "./post-components/post.text.component";
import {PostAnswerComponent} from "./post-components/post.answer.component";
import {PostLinkComponent} from "./post-components/post.link.component";
import {PostChatComponent} from "./post-components/post.chat.component";
import {PostQuoteComponent} from "./post-components/post.quote.component";
import {PostCaptionComponent} from "./post-components/post.caption.component";
import {PostTitleComponent} from "./post-components/post.title.component";

@Component({
    selector: 'post-list',
    directives: [ InfiniteScroll, VideoBehaviourDirective, TumblrImageDirective, TumblrLinkDirective
        , ROUTER_DIRECTIVES, PostPhotoComponent, PostVideoComponent, PostMetaComponent, TumblrEmbeddedImageDirective
        , PostTextComponent, PostAnswerComponent, PostLinkComponent, PostChatComponent, PostQuoteComponent
        , PostCaptionComponent, PostTitleComponent],
    template: `
        <div class="center">
            <h1 *ngIf="tagParam">#{{tagParam}}</h1>
            <h2 *ngIf="message">{{message}}</h2>
            <a *ngIf="postId" [routerLink]="['/blog', blog.name]">
                <h1>{{blog.name}}</h1>
            </a>
        </div>
        
        <div class="pure-u-1-5"></div>
        <div class="pure-u-3-5">
            <ul infinite-scroll [infiniteScrollDistance]="4" [infiniteScrollThrottle]="600" (scrolled)="onScroll()">
                <li *ngFor="let post of posts" class="post">
                    <div>
                        <div class="full">
                            <post-photo *ngIf="post.photos" [postPhotos]="post.photos"></post-photo>
                            <post-video *ngIf="post.type == 'video'" [postPlayers]="post.player"></post-video>
                        </div>
                        <div class="padded">
                            <post-title *ngIf="post.title" [post]="post"></post-title>
                        
                            <post-answer *ngIf="post.type == 'answer'" [post]="post"></post-answer>
                            
                            <post-quote *ngIf="post.type == 'quote'" [post]="post"></post-quote>
                            
                            <post-chat *ngIf="post.type == 'chat'" [post]="post"></post-chat>
                            
                            <post-link *ngIf="post.type == 'link'" [post]="post"></post-link>
                            
                            <post-caption *ngIf="post.caption" [post]="post"></post-caption>
                            
                            <post-text *ngIf="post.type == 'text' && post.body" [post]="post"></post-text>
                            
                            <post-meta class="meta"[blog]="blog" [post]="post"></post-meta>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
    styles: [`
        div.center {
            text-align: center;
        }
        
        ul{
            padding: 0;
            list-style: none;
        }
        
        li.post:first-child{
            margin-top: 0;
        }
        
        li.post{
            border: 1px solid lightgrey;
            border-radius: 4px;
            margin: 40px 0;
        }
                
        div.padded{
            padding: 1em;
        }
        
        div.padded *{
            display: block;
        }
        
        div.padded *:not(:first-child){
            padding-top: 1em;
        }
        
        div.padded post-meta.meta{
            padding-top: 2em;
        }
    `]
})
export class PostListComponent{
    private blog: Blog;
    private posts: Post[];
    private postCounter: number = 10;
    private totalPosts: number;
    private message: string = "Loading ...";
    private tagParam: string;
    private postId: number;
    constructor(private _route: ActivatedRoute, private _tumblrService: TumblrService) {
        _route.params.subscribe(params => {
            this.blog = new Blog(params["name"]);
            this.tagParam = params["tag"]?decodeURIComponent(params["tag"]):null;
            this.postId = params["post"]?parseInt(params["post"]):null;
            _tumblrService.getPosts(params["name"], 0, this.tagParam, this.postId).subscribe(res => {
                this.blog = res.blog;
                this.posts = res.posts;
                this.totalPosts = res.total_posts;

                document.title = res.blog.title !== ""? res.blog.title: res.blog.name;

                this.message = null;
            }, err => {
                let response = err.json();
                if(response && response.meta){
                    this.message = response.meta.msg;
                    document.title = response.meta.msg;
                }else{
                    this.message = "Error Loading Data";
                    document.title = "Error Loading Data";
                }
            });
        });
    }

    onScroll(){
        if(this.postCounter < this.totalPosts){
            this._tumblrService.getPosts(this.blog.name, this.postCounter, this.tagParam, this.postId).subscribe(res => {
                this.posts = this.posts.concat(res.posts);
            });
            this.postCounter += 10;
        }
    }
}