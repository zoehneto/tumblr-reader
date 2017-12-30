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
                <label>Enter blog urls here, one per line
                    <textarea [(ngModel)]="blogText" rows="15"></textarea>
                </label>

                <label>Highlight blogs updated in the last days (0 = no highlight)
                    <input type="number" [(ngModel)]="updatedInDays"/>
                </label>

                <label>Enable Click-to-Play for GIFs
                    (improves performance and reduces downloads especially on slow connections)
                    <input type="checkbox" [(ngModel)]="gifClickToPlay"/>
                </label>

                <div class="center">
                    <button (click)="saveSettings()" type="button">Save</button>
                </div>
                <div class="center">
                    <p *ngFor="let error of errors">{{error}}</p>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    blogText = '';
    updatedInDays: number;
    gifClickToPlay: boolean;
    errors: string[] = [];
    private blogs: Blog[];
    constructor(private settingsService: SettingsService, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('tumblr reader - Settings');
        this.settingsService.getBlogs().subscribe(blogs => {
            blogs === null ? this.blogs = [] : this.blogs = blogs;
            this.blogText = this.blogsToText(this.blogs);
        });
        this.settingsService.getUpdatedInDays()
            .subscribe(updatedInDays => this.updatedInDays = updatedInDays);
        this.settingsService.getGifClickToPlay()
            .subscribe(gifClickToPlayEnabled => this.gifClickToPlay = gifClickToPlayEnabled);
    }

    async saveSettings() {
        this.errors = [];
        await this.settingsService.setGifClickToPlay(this.gifClickToPlay);
        await this.settingsService.setUpdatedInDays(this.updatedInDays);
        this.errors = await this.settingsService.setBlogs(this.textToBlogs(this.blogText));
    }

    blogsToText(blogs: Blog[]): string {
        let blogText = '';
        blogs.forEach(blog => {
            blogText += blog.name + '\n';
        });
        return blogText;
    }

    textToBlogs(blogText: string): Blog[] {
        const blogs: Blog[] = [];
        blogText.split('\n').forEach(blogName => {
            if (blogName) {
                blogs.push(new Blog(blogName));
            }
        });
        return blogs;
    }
}
