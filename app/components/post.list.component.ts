import { Component } from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
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

@Component({
    selector: 'post-list',
    directives: [ InfiniteScroll, VideoBehaviourDirective, TumblrImageDirective, TumblrLinkDirective
        , ROUTER_DIRECTIVES, PostPhotoComponent, PostVideoComponent, PostMetaComponent, TumblrEmbeddedImageDirective],
    template: `
        <div class="center">
            <h1 *ngIf="tagParam">#{{tagParam}}</h1>
            <h2 *ngIf="message">{{message}}</h2>
            <a *ngIf="postId" [routerLink]="['/blog', blog.name]">
                <h1>{{blog.name}}</h1>
            </a>
        </div>
        
        <div class="pure-u-1-6"></div>
        <div class="pure-u-2-3">
            <ul infinite-scroll [infiniteScrollDistance]="4" [infiniteScrollThrottle]="600" (scrolled)="onScroll()">
                <li *ngFor="let post of posts" class="post">
                    <div>
                        <div class="full">
                            <post-photo *ngIf="post.type == 'photo'" [postPhotos]="post.photos"></post-photo>
                            <post-video *ngIf="post.type == 'video'" [postPlayers]="post.player"></post-video>
                        </div>
                        <div class="padded">
                            <div *ngIf="post.type == 'answer'">
                                <div class="question">
                                    <p>{{post.asking_name}} asked:</p>
                                    <p>{{post.question}}</p>
                                </div>
                                <div [innerHTML]="post.answer" tumblrLink tumblrEmbeddedImage></div>
                            </div>
                            
                            <div *ngIf="post.type == 'quote'">
                                <p>{{post.text}}</p>
                                <div [innerHTML]="post.source"></div>
                            </div>
                            
                            <div *ngIf="post.type == 'chat'">
                                <p *ngFor="let message of post.dialogue">{{message.label}} {{message.phrase}}</p>
                            </div>
                            
                            <div *ngIf="post.type == 'link'">
                                <a href="{{post.url}}">{{post.title}}</a>
                                <div [innerHTML]="post.description" tumblrLink tumblrEmbeddedImage></div>
                            </div>
                            
                            <div *ngIf="post.caption" class="caption" [innerHTML]="post.caption" tumblrLink tumblrEmbeddedImage></div>
                            
                            <div *ngIf="post.type == 'text'">
                                <h2 class="post-title">{{post.title}}</h2>
                                <div *ngIf="post.body" class="body" [innerHTML]="post.body" tumblrLink tumblrEmbeddedImage></div>
                            </div>
                            
                            <post-meta [blog]="blog" [post]="post"></post-meta>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
    styles: [`
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
        
        h2.post-title{
            margin-top: 0;
            padding-bottom: 0.5em;
        }
        
        div.padded{
            padding: 1em;
        }
        
        div.caption, div.body {
            margin-top: -1em;
        }
        
        div.question{
            padding: 0.5em 1em;
            border-radius: 4px;
            background-color: lightgrey;
        }
        
        div.center {
            text-align: center;
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
    constructor(private _routeSegment: RouteSegment, private _tumblrService: TumblrService) {
        this.blog = new Blog();
        this.tagParam = _routeSegment.getParam("tag")?decodeURIComponent(_routeSegment.getParam("tag")):null;
        this.postId = _routeSegment.getParam("post")?parseInt(_routeSegment.getParam("post")):null;
        _tumblrService.getPosts(_routeSegment.getParam("name"), 0, this.tagParam, this.postId).subscribe(res => {
            this.blog = res.blog;
            this.posts = res.posts;
            this.totalPosts = res.total_posts;

            document.title = res.blog.title;

            this.message = null;
        }, err => {
            let response = err.json();
            if(response && response.meta){
                this.message = response.meta.msg;
            }else{
                this.message = "Error Loading Data";
            }
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