import { Component } from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {VideoBehaviourDirective} from "../attribute-directives/video.behaviour.directive";
import {TumblrImageDirective} from "../attribute-directives/tumblr.image.directive";
import {TumblrLinkDirective} from "../attribute-directives/tumblr.link.directive";

@Component({
    selector: 'post-list',
    directives: [ InfiniteScroll, VideoBehaviourDirective, TumblrImageDirective, TumblrLinkDirective, ROUTER_DIRECTIVES ],
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
                            <div *ngIf="post.type == 'photo'">
                                <img *ngFor="let photo of post.photos" [tumblrImage]="photo">
                            </div>
                            <div *ngIf="post.type == 'video'" [innerHTML]="post.player[post.player.length - 1].embed_code" videoBehaviour></div>
                        </div>
                        <div class="padded">
                            <div *ngIf="post.type == 'answer'">
                                <div class="question">
                                    <p>{{post.asking_name}} asked:</p>
                                    <p>{{post.question}}</p>
                                </div>
                                <div [innerHTML]="post.answer" tumblrLink></div>
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
                                <div [innerHTML]="post.description" tumblrLink></div>
                            </div>
                            
                            <div *ngIf="post.caption" class="caption" [innerHTML]="post.caption" tumblrLink=""></div>
                            
                            <div *ngIf="post.type == 'text'">
                                <h2 class="post-title">{{post.title}}</h2>
                                <div *ngIf="post.body" class="body" [innerHTML]="post.body" tumblrLink></div>
                            </div>
                            
                            <p *ngIf="post.source_url">(Source: <a [tumblrLink]="post.source_url">{{post.source_title}}</a>)</p>
                            
                            <div>
                                <ul class="list-inline">
                                    <li *ngFor="let tag of post.tags">
                                        <a target="_blank" [routerLink]="['/blog-details', blog.name, 'tag', tag]">#{{tag}}</a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="date">
                                {{post.date | date}}
                            </div>
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
        
        .list-inline > li{
            display: inline-block;
            margin: 0;
            padding-left: 0;
            padding-right: 1em;
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
        
        div.date{
            margin-top: 1em;
            color: #6E6E6E;
        }
        
        div.question{
            padding: 0.5em 1em;
            border-radius: 4px;
            background-color: lightgrey;
        }
        
        div.center {
            text-align: center;
        }
        
        img{
            width: 100%;
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