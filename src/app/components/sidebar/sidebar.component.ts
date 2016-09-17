import { Component, OnInit } from '@angular/core';
import { Blog } from '../../data.types';
import { SettingsService } from '../../shared/settings.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys/angular2-hotkeys';
import { BlogItemSwitch } from '../../item-switch/blog.item.switch';

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
                        <img src="https://api.tumblr.com/v2/blog/{{blog.name}}/avatar/16">
                    </span>
                    <a [routerLink]="['/blog/',blog.name]">{{blog.name}}</a>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    private blogs: Blog[];
    private updateInDays: number = 0;
    constructor(private settingsService: SettingsService, private hotkeysService: HotkeysService,
        private blogItemSwitch: BlogItemSwitch) {
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

        this.settingsService.getUpdatedInDays()
            .subscribe(updateInDays => this.updateInDays = updateInDays);

        this.settingsService.getBlogs()
            .subscribe(blogs => {
                if (blogs === null) {
                    this.blogs = [];
                } else {
                    this.blogs = blogs.sort((blog1, blog2) => {
                        let blog1Recent = this.settingsService
                            .isUpdatedInDays(blog1.updated, this.updateInDays);
                        let blog2Recent = this.settingsService
                            .isUpdatedInDays(blog2.updated, this.updateInDays);
                        if (blog1Recent && !blog2Recent) {
                            return -1;
                        }
                        if (!blog1Recent && blog2Recent) {
                            return 1;
                        }
                        return 0;
                    });
                }
            });
    }

    private selected(blogName: string) {
        return location.pathname.indexOf(blogName) > -1;
    }

    private isRecent(blog: Blog): boolean {
        return this.updateInDays === 0
            || this.settingsService.isUpdatedInDays(blog.updated, this.updateInDays);
    }
}
