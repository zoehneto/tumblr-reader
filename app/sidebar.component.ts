import { Component } from '@angular/core';
import {Blog} from "./data.types";
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'sidebar',
    template: `
        <ul>
            <li *ngFor="let blog of blogs">
                <a [routerLink]="['/',blog.name]">{{blog.name}}</a>
            </li>
        </ul>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class SidebarComponent{
    private blogs:Blog[]
    constructor(){
        this.blogs = [new Blog()];
        this.blogs[0].name = 'test';
    }
}