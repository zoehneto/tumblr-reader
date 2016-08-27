import { Component, OnInit } from '@angular/core';
import { Blog } from '../data.types';
import { SettingsService } from '../shared/settings.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys/angular2-hotkeys';
import { BlogItemSwitch } from '../item-switch/blog.item.switch';

@Component({
    selector: 'side-bar',
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
        @media screen and (min-width: 48em){
            div{
                position: fixed;
                height: 100%;
                width: inherit;
            }
        }
        
        div{
            background-color: #EEEEEE;
        }
        
        ul{
            padding: 1em 0 1em 2em;
            margin: 0;
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
