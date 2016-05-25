import { Component } from '@angular/core';
import {Blog} from "./../data.types";
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SettingsService} from "../shared/settings.service";

@Component({
    selector: 'sidebar',
    template: `
        <div>
            <ul>
                <li class="settings" class="settings {{selected('/settings') ? 'selected' : ''}}">
                    <a [routerLink]="['/settings']">Settings</a>
                </li>
                <li *ngFor="let blog of blogs" class="blog {{selected('/blog/' + blog.name) ? 'selected' : ''}}">
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
    `],
    directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent{
    private blogs:Blog[];
    constructor(private _settingsService: SettingsService){
        _settingsService.getBlogs().subscribe(blogs => blogs === null ? this.blogs = [] : this.blogs = blogs);
    }

    selected(blogName: string){
        if(location.pathname === blogName){
            return true;
        }
        return false;
    }
}