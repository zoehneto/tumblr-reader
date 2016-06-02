import { Component } from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {VideoBehaviourDirective} from "../attribute-directives/video.behaviour.directive";
import {TumblrImageDirective} from "../attribute-directives/tumblr.image.directive";

@Component({
    selector: 'post-list',
    directives: [ InfiniteScroll, VideoBehaviourDirective, TumblrImageDirective, ROUTER_DIRECTIVES ],
    template: `
        <div class="center">
            <h1 *ngIf="tag_param">#{{tag_param}}</h1>
            <h2 *ngIf="message">{{message}}</h2>
        </div>
        
        <div class="pure-u-1-6"></div>
        <div class="pure-u-2-3">
            <ul infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="600" (scrolled)="onScroll()">
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
                                <div [innerHTML]="post.answer"></div>
                            </div>
                            
                            <div *ngIf="post.type == 'quote'">
                                <p>{{post.text}}</p>
                                <div [innerHTML]="post.source"></div>
                            </div>
                            
                            <div *ngIf="post.type == 'link'">
                                <a href="{{post.url}}">{{post.title}}</a>
                                <div [innerHTML]="post.description"></div>
                            </div>
                            
                            <div *ngIf="post.caption" class="caption" [innerHTML]="post.caption"></div>
                            
                            <div *ngIf="post.type == 'text'">
                                <h2 class="post-title">{{post.title}}</h2>
                                <div *ngIf="post.body" class="body" [innerHTML]="post.body"></div>
                            </div>
                            
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
    private message: string = "Loading ...";
    private tag_param: string;
    constructor(private _routeSegment: RouteSegment, private _tumblrService: TumblrService) {
        this.blog = new Blog();
        this.tag_param = _routeSegment.getParam("tag")?decodeURIComponent(_routeSegment.getParam("tag")):null;
        _tumblrService.getPosts(_routeSegment.getParam("name"), 0, this.tag_param).subscribe(res => {
            this.blog = res.blog;
            this.posts = res.posts;

            document.title = res.blog.title;

            this.message = null;
        }, err => {
            this.message = "Error Loading Data";
        });
    }

    onScroll(){
        if(this.postCounter < this.blog.posts){
            this._tumblrService.getPosts(this.blog.name, this.postCounter, this.tag_param).subscribe(res => {
                this.posts = this.posts.concat(res.posts);
            });
            this.postCounter += 10;
        }
    }
}