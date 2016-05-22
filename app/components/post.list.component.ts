import { Component } from '@angular/core';
import {RouteSegment} from '@angular/router';
import {Blog, Post} from "./../data.types";
import {TumblrService} from "./../shared/tumblr.service";
import {InfiniteScroll} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {VideoBehaviourDirective} from "../attribute-directives/video.behaviour.directive";

@Component({
    selector: 'post-list',
    directives: [ InfiniteScroll, VideoBehaviourDirective ],
    template: `
        <div class="pure-u-1-6"></div>
        <!--<ul infinite-scroll [infiniteScrollDistance]="4" [infiniteScrollThrottle]="600" (scrolled)="onScroll()" class="pure-u-2-3">-->
        <ul infinite-scroll [infiniteScrollDistance]="4" (scrolled)="onScroll()" class="pure-u-2-3">
            <li *ngFor="let post of posts" class="post">
                <div>
                    <div class="full">
                        <div *ngIf="post.type == 'photo'">
                            <img *ngFor="let photo of post.photos" src="{{photo.original_size.url}}">
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
                            <h2 *ngIf="!post.body">{{post.title}}</h2>
                            <div *ngIf="post.body" class="body" [innerHTML]="post.body"></div>
                        </div>
                        
                        <div>
                            <ul class="list-inline">
                                <li *ngFor="let tag of post.tags">
                                    <a target="_blank" href="http://{{blog.name}}.tumblr.com/tagged/{{tag}}">#{{tag}}</a>
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
        
        div.padded{
            padding: 1em;
        }
        
        div.caption, div.body {
            margin-top: -1em;
        }
        
        div.date{
            margin-top: 1em;
        }
        
        div.question{
            padding: 0.5em 1em;
            border-radius: 4px;
            background-color: lightgrey;
        }
        
        img{
            width: 100%;
        }
    `]
})
export class PostListComponent{
    private blog: Blog;
    private posts: Post[];
    private postCounter: number = 20;
    constructor(private _routeSegment: RouteSegment, private _tumblrService: TumblrService) {
        this.blog = new Blog();
        _tumblrService.getPosts(_routeSegment.getParam("name")).subscribe(res => {
            this.blog = res.blog;
            this.posts = res.posts;
        });
    }

    onScroll(){
        if(this.postCounter < this.blog.posts){
            this._tumblrService.getPosts(this.blog.name, this.postCounter).subscribe(res => {
                this.posts = this.posts.concat(res.posts);
            });
            this.postCounter += 20;
        }
    }
}