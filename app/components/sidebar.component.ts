import { Component } from '@angular/core';
import {Blog} from "./../data.types";
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SettingsService} from "../shared/settings.service";

@Component({
    selector: 'sidebar',
    template: `
        <ul>
            <li>
                <a [routerLink]="['/settings']">Settings</a>
            </li>
            <li *ngFor="let blog of blogs">
                <a [routerLink]="['/blog/',blog.name]">{{blog.name}}</a>
            </li>
        </ul>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent{
    private blogs:Blog[]
    constructor(private _settingsService: SettingsService){
        _settingsService.getBlogs().subscribe(blogs => blogs === null ? this.blogs = [] : this.blogs = blogs);
    }
}