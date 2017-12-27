import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog, Post } from '../../data.types';
import { TumblrService } from '../../shared/tumblr.service';
import { FaviconService } from '../../shared/favicon.service';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../../shared/settings.service';
import { Subscription } from 'rxjs/Subscription';
import { PostComponent } from '../post-components/post/post.component';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { CurrentPostService } from '../../shared/current.post.service';

@Component({
    selector: 'post-list',
    template: `
        <div class="center">
            <h1 *ngIf="tagParam">#{{tagParam}}</h1>
            <a *ngIf="postId" [routerLink]="['/blog', blog.name]">
                <h1>{{blog.name}}</h1>
            </a>
        </div>

        <div class="pure-u-lg-1-5"></div>
        <div class="pure-u-1 pure-u-lg-3-5">
            <ul postSwitch [loadMoreItems]="onScroll.bind(this)"
            subPostSwitch [loadMoreItems]="onScroll.bind(this)"
            infiniteScroll [infiniteScrollDisabled]="loading" [infiniteScrollDistance]="4"
            [infiniteScrollThrottle]="200" (scrolled)="onScroll()">
                <li *ngFor="let post of posts" class="post {{isRecent(post) ? 'recent' : ''}}">
                    <complete-post [post]="post" [blog]="blog"></complete-post>
                </li>
            </ul>
        </div>

        <div class="center message">
            <h2 *ngIf="message">{{message}}</h2>
        </div>
    `,
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    @ViewChildren(PostComponent) postComponents: QueryList<PostComponent>;
    @ViewChildren(PostComponent, {read: ElementRef}) postElements: QueryList<ElementRef>;
    blog: Blog;
    posts: Post[];
    message: string | null;
    tagParam: string | null;
    postId: number | null;
    loading: boolean;
    private postCounter: number;
    private totalPosts: number;
    private updatedInDays: number = 0;
    private subscription: Subscription;
    private hotkeys: Hotkey[];
    constructor(private route: ActivatedRoute, private tumblrService: TumblrService,
                private faviconService: FaviconService, private titleService: Title,
                private settingsService: SettingsService, private hotkeysService: HotkeysService,
                private currentPostService: CurrentPostService) {
    }

    ngOnInit() {
        this.settingsService.getUpdatedInDays()
            .subscribe(updatedInDays => this.updatedInDays = updatedInDays);
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
        this.hotkeys = [
            new Hotkey('p', (event: KeyboardEvent): boolean => {
                const postIndex = this.currentPostService.getCurrentPostIndex(
                    this.postElements.map(elementRef => elementRef.nativeElement));
                const currentPost = this.postComponents.find((item, index) => index === postIndex);
                if (currentPost) {
                    currentPost.play();
                }
                return false;
            }),
            new Hotkey('space', (event: KeyboardEvent): boolean => {
                const scrollingElement = document.scrollingElement || document.documentElement;
                if (scrollingElement) {
                    scrollingElement.scrollTop += window.innerHeight - 40;
                }
                return false;
            })
        ];
        this.hotkeysService.add(this.hotkeys);
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
    }

    isRecent(post: Post): boolean {
        return this.updatedInDays > 0
            && this.settingsService.isUpdatedInDays(post.date, this.updatedInDays);
    }

    onScroll(): Promise<any> {
        if (this.postCounter < this.totalPosts && !this.loading) {
            return this.loadPosts();
        }
        return new Promise((resolve, reject) => reject('Already loading or maximum reached'));
    }

    private loadPosts(): Promise<any> {
        this.loading = true;
        this.message = 'Loading ...';
        return new Promise((resolve, reject) => {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.tumblrService.getPosts(this.blog.name, this.postCounter,
                this.tagParam, this.postId).subscribe(res => {
                this.blog = res.blog;
                this.posts = this.posts.concat(res.posts);
                this.totalPosts = res.total_posts;
                this.postCounter += res.posts.length;

                this.titleService.setTitle(res.blog.title !== '' ? res.blog.title : res.blog.name);

                this.message = null;
                this.loading = false;
                resolve();
            }, err => {
                try {
                    const response = err.json();
                    if (response && response.meta) {
                        this.message = response.meta.msg;
                        this.titleService.setTitle(response.meta.msg);
                    } else {
                        this.message = 'Blog not found';
                        this.titleService.setTitle('Blog not found');
                    }
                } catch (ignored) {
                    this.message = 'Error Loading Data';
                    this.titleService.setTitle('Error Loading Data');
                }
                reject();
            });
        });
    }
}
