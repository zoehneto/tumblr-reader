import { Component, OnInit } from '@angular/core';
import { Blog } from '../data.types';
import { SettingsService } from '../shared/settings.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'reader-settings',
    template: `
        <div class="pure-u-md-1-6 pure-u-lg-1-3"></div>
        <div class="pure-u-1 pure-u-md-2-3 pure-u-lg-1-3">
            <div class="container">
                <p>Enter blog urls here, one per line</p>
                <textarea [(ngModel)]="blogText" rows="15"></textarea>
                <div class="center">
                    <button (click)="saveSettings()" type="button">Save</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        div.container {
            margin: 0 1em;
        }
        
        textarea {
            margin: 0 0 1em 0;
            border: 1px solid lightgrey;
            padding: 2px;
            width: calc(100% - 6px);
        }
        
        div.center {
            text-align: center;
        }
        
        button {
            padding: 0.8em 4em;
            border: none;
            border-radius: 4px;
        }
    `]
})
export class SettingsComponent implements OnInit {
    private blogs: Blog[];
    private blogText: string = '';
    constructor(private settingsService: SettingsService, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('tumblr reader - Settings');
        this.settingsService.getBlogs().subscribe(blogs => {
            blogs === null ? this.blogs = [] : this.blogs = blogs;
            this.blogText = this.blogsToText(this.blogs);
        });
    }

    saveSettings() {
        this.settingsService.setBlogs(this.textToBlogs(this.blogText));
    }

    blogsToText(blogs: Blog[]): string {
        let blogText: string = '';
        blogs.forEach(blog => {
            blogText += blog.name + '\n';
        });
        return blogText;
    }

    textToBlogs(blogText: string): Blog[] {
        let blogs: Blog[] = [];
        blogText.split('\n').forEach(blogName => {
            if (blogName) {
                blogs.push(new Blog(blogName));
            }
        });
        return blogs;
    }
}
