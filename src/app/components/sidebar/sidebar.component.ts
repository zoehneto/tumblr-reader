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
                class="blog {{selected('/blog/' + blog.name) ? 'selected' : ''}}">
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
    constructor(private settingsService: SettingsService, private hotkeysService: HotkeysService,
        private blogItemSwitch: BlogItemSwitch) {
        hotkeysService.add([
            new Hotkey('shift+j', (event: KeyboardEvent): boolean => {
                blogItemSwitch.showNextItem(this.blogs);
                return false;
            }), new Hotkey('shift+k', (event: KeyboardEvent): boolean => {
                blogItemSwitch.showPreviousItem(this.blogs);
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
}
