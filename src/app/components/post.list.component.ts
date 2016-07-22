import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog, Post } from '../data.types';
import { TumblrService } from '../shared/tumblr.service';
import { FaviconService } from '../shared/favicon.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'post-list',
    template: `
        <div class="center">
            <h1 *ngIf="tagParam">#{{tagParam}}</h1>
            <a *ngIf="postId" [routerLink]="['/blog', blog.name]">
                <h1>{{blog.name}}</h1>
            </a>
        </div>
        
        <div class="pure-u-1-5"></div>
        <div class="pure-u-3-5">
            <ul postSwitch (moreItemsNeeded)="onScroll()" infinite-scroll
            [infiniteScrollDisabled]="loading" [infiniteScrollDistance]="4"
            [infiniteScrollThrottle]="600" (scrolled)="onScroll()">
                <li *ngFor="let post of posts" class="post">
                    <complete-post [post]="post" [blog]="blog"></complete-post>
                </li>
            </ul>
        </div>
        
        <div class="center message">
            <h2 *ngIf="message">{{message}}</h2>
        </div>
    `,
    styles: [`
        div.center {
            text-align: center;
        }
        
        div.center.message{
            margin-top: -1em;
        }
        
        ul{
            padding: 0;
            list-style: none;
        }
        
        li.post:first-child{
            margin-top: 0;
        }
        
        li.post:last-child{
            margin-bottom: 0;
        }
        
        li.post{
            border: 1px solid lightgrey;
            border-radius: 4px;
            margin: 40px 0;
            overflow: hidden;
        }
    `]
})
export class PostListComponent implements OnInit {
    private blog: Blog;
    private posts: Post[];
    private postCounter: number;
    private totalPosts: number;
    private message: string;
    private tagParam: string;
    private postId: number;
    private loading: boolean;
    constructor(private route: ActivatedRoute, private tumblrService: TumblrService,
                private faviconService: FaviconService, private titleService: Title) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.postCounter = 0;
            this.posts = [];
            this.blog = new Blog(params['name']);
            this.tagParam = params['tag'] ? decodeURIComponent(params['tag']) : null;
            this.postId = params['post'] ? parseInt(params['post'], 10) : null;
            this.faviconService.setFavicon('https://api.tumblr.com/v2/blog/'
                + params['name'] + '/avatar/16');

            this.loadPosts();
        });
    }

    onScroll() {
        if (this.postCounter < this.totalPosts && !this.loading) {
            this.loadPosts();
        }
    }

    loadPosts() {
        this.loading = true;
        this.message = 'Loading ...';
        this.tumblrService.getPosts(this.blog.name, this.postCounter, this.tagParam,
             this.postId).subscribe(res => {
            this.blog = res.blog;
            this.posts = this.posts.concat(res.posts);
            this.totalPosts = res.total_posts;
            this.postCounter += res.posts.length;

            this.titleService.setTitle(res.blog.title !== '' ? res.blog.title : res.blog.name);

            this.message = null;
            this.loading = false;
        }, err => {
            let response = err.json();
            if (response && response.meta) {
                this.message = response.meta.msg;
                this.titleService.setTitle(response.meta.msg);
            }else {
                this.message = 'Error Loading Data';
                this.titleService.setTitle('Error Loading Data');
            }
        });
    }
}
