import { Component, OnInit } from '@angular/core';
import { Blog } from '../../data.types';
import { SettingsService } from '../../shared/settings.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'reader-settings',
    template: `
        <div class="pure-u-md-1-6 pure-u-lg-1-3"></div>
        <div class="pure-u-1 pure-u-md-2-3 pure-u-lg-1-3">
            <div class="container">
                <p>Enter blog urls here, one per line</p>
                <textarea [(ngModel)]="blogText" rows="15"></textarea>
                <p>Highlight blogs updated in the last days (0 = no highlight)</p>
                <input type="number" [(ngModel)]="updateInDays"/>
                <div class="center">
                    <button (click)="saveSettings()" type="button">Save</button>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    private blogs: Blog[];
    private blogText: string = '';
    private updateInDays: number;
    constructor(private settingsService: SettingsService, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('tumblr reader - Settings');
        this.settingsService.getBlogs().subscribe(blogs => {
            blogs === null ? this.blogs = [] : this.blogs = blogs;
            this.blogText = this.blogsToText(this.blogs);
        });
        this.settingsService.getUpdatedInDays()
            .subscribe( updateInDays => this.updateInDays = updateInDays);
    }

    saveSettings() {
        this.settingsService.setBlogs(this.textToBlogs(this.blogText)).subscribe(blogs => {
            this.settingsService.setUpdatedInDays(this.updateInDays);
        });
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
