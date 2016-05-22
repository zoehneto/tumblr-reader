import { Component } from '@angular/core';
import {Blog} from "./../data.types";
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SettingsService} from "../shared/settings.service";

@Component({
    selector: 'settings',
    template: `
        <div class="pure-u-1-3"></div>
        <div class="pure-u-1-3">
            <textarea [(ngModel)]="blogText" rows="15"></textarea>
            <div class="center">
                <button (click)="saveSettings()" type="button">Save</button>
            </div>
        </div>
    `,
    styles: [`
        textarea{
            margin-top: 16px;
            width: 100%;
        }
        
        div.center {
            text-align: center;
        }
        
        button{
            margin-top: 10px;
            padding: 5px 30px;
            border: none;
            border-radius: 4px;
        }
    `],
    directives: [ROUTER_DIRECTIVES]
})
export class SettingsComponent{
    private blogs:Blog[];
    private blogText: string = '';
    constructor(private _settingsService: SettingsService){
        _settingsService.getBlogs().subscribe(blogs => {
            blogs === null ? this.blogs = [] : this.blogs = blogs;
            this.blogText = this.blogsToText(this.blogs);
        });
    }

    saveSettings(){
        this._settingsService.setBlogs(this.textToBlogs(this.blogText));
    }

    blogsToText(blogs:Blog[]): string {
        let blogText: string = '';
        blogs.forEach(blog =>{
            blogText += blog.name + '\n';
        });
        
        return blogText;
    }

    textToBlogs(blogText:string): Blog[] {
        let blogs: Blog[] = [];
        blogText.split("\n").forEach(blogName => {
            if(blogName){
                blogs.push(new Blog(blogName));
            }
        });

        return blogs;
    }
}