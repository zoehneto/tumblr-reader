import { Component, OnInit } from '@angular/core';
import { Blog } from '../data.types';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { SettingsService } from '../shared/settings.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys/angular2-hotkeys';

@Component({
    selector: 'side-bar',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <div>
            <ul>
                <li class="settings" class="settings {{selected('/settings') ? 'selected' : ''}}">
                    <a [routerLink]="['/settings']">Settings</a>
                </li>
                <li *ngFor="let blog of blogs" 
                class="blog {{selected('/blog/' + blog.name) ? 'selected' : ''}}">
                    <span>
                        <img src="https://api.tumblr.com/v2/blog/{{blog.name}}/avatar/16">
                    </span>
                    <a [routerLink]="['/blog/',blog.name]">{{blog.name}}</a>
                </li>
            </ul>
        </div>
    `,
    styles: [`
        div{
            position: fixed;
            height: 100%;
            width: 20%;
            background-color: #EEEEEE;
        }
        
        ul{
            padding-left: 2em;
            list-style: none;
        }
        
        li.settings{
            margin-bottom: 2em;
        }
        
        li.blog{
            margin-bottom: 0.8em;
            display: table;
        }
        
        li.blog a{
            word-break: break-all;
            padding-left: .5em;
        }
        
        li.selected{
            font-weight: bold;
        }
        
        span{
            display: table-cell;
            vertical-align: middle;
        }
        
        img{
            display: table-cell;
        }
        
        a:link, a:visited, a:hover, a:active {
            display: table-cell;
            vertical-align: middle;
            color: black;
            text-decoration: none;
        }
    `]
})
export class SidebarComponent implements OnInit {
    private blogs: Blog[];
    constructor(private settingsService: SettingsService, private hotkeysService: HotkeysService,
        private router: Router) {
        hotkeysService.add([
            new Hotkey('shift+j', (event: KeyboardEvent): boolean => {
                this.nextBlog();
                return false;
            }), new Hotkey('shift+k', (event: KeyboardEvent): boolean => {
                this.previousBlog();
                return false;
            })
        ]);
    }

    ngOnInit() {
        this.settingsService.getBlogs()
            .subscribe(blogs => blogs === null ? this.blogs = [] : this.blogs = blogs);
    }

    selected(blogName: string) {
        if (location.pathname.indexOf(blogName) > -1) {
            return true;
        }
        return false;
    }

    private nextBlog() {
        this.showBlog(1);
    }

    private previousBlog() {
        this.showBlog(-1);
    }

    private showBlog(modifier: number) {
        let currentBlogIndex = this.getCurrentBlogIndex();
        if (currentBlogIndex !== null) {
            let blogIndex = currentBlogIndex + modifier;
            if (blogIndex > -1 && blogIndex < this.blogs.length) {
                this.router.navigate(['/blog/', this.blogs[blogIndex].name]);
            }
        }
    }

    private getCurrentBlogIndex(): number {
        for (let i = 0; i < this.blogs.length; i++) {
            if (this.selected('/blog/' + this.blogs[i].name)) {
                return i;
            }
        }
        return null;
    }
}
