import { Component, OnInit } from '@angular/core';
import { Blog } from '../../data-types';
import { SettingsService } from '../../services/settings.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { BlogItemSwitchService } from '../../services/item-switch/blog-item-switch.service';

@Component({
    selector: 'side-bar',
    template: `
        <div>
            <ul>
                <li class="settings {{selected('/settings') ? 'selected' : ''}}">
                    <a [routerLink]="['/settings']">Settings</a>
                </li>
                <li *ngFor="let blog of blogs"
                class="blog {{selected('/blog/' + blog.name) ? 'selected' : ''}}
                {{isRecent(blog) ? 'recent' : ''}}">
                    <span>
                        <img class="avatar" src="https://api.tumblr.com/v2/blog/{{blog.name}}/avatar/16">
                    </span>
                    <a [routerLink]="['/blog/',blog.name]">
                        {{blog.title ? blog.title : blog.name}}
                    </a>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    blogs: Blog[] = [];
    private updatedInDays = 0;
    constructor(private settingsService: SettingsService, private hotkeysService: HotkeysService,
        private blogItemSwitch: BlogItemSwitchService) {
    }

    ngOnInit() {
        this.hotkeysService.add([
            new Hotkey('shift+j', (event: KeyboardEvent): boolean => {
                this.blogItemSwitch.showNextItem(this.blogs);
                return false;
            }), new Hotkey('shift+k', (event: KeyboardEvent): boolean => {
                this.blogItemSwitch.showPreviousItem(this.blogs);
                return false;
            })
        ]);

        this.settingsService.getUpdatedInDays().subscribe(updatedInDays => {
            this.updatedInDays = updatedInDays;
            this.sortBlogs();
        });

        this.settingsService.getBlogs().subscribe(blogs => {
            this.blogs = blogs === null ? [] : blogs;
            this.sortBlogs();
        });
    }

    selected(blogName: string) {
        return location.hash.indexOf(blogName) > -1;
    }

    isRecent(blog: Blog): boolean {
        return this.updatedInDays === 0
            || this.settingsService.isUpdatedInDays(blog.updated, this.updatedInDays);
    }

    private sortBlogs() {
        const updatedBlogs: Blog[] = [];
        const notUpdatedBlogs: Blog[] = [];
        this.blogs.forEach(blog => {
            if (this.settingsService.
                isUpdatedInDays(blog.updated, this.updatedInDays)) {
                updatedBlogs.push(blog);
            } else {
                notUpdatedBlogs.push(blog);
            }
        });
        this.blogs = updatedBlogs.concat(notUpdatedBlogs);
    }
}
