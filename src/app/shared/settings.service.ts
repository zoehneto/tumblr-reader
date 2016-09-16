import { Injectable } from '@angular/core';
import { Blog, localforage, Settings } from '../data.types';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TumblrService } from './tumblr.service';

@Injectable()
export class SettingsService {
    private subject: Subject<Blog[]> = new Subject<Blog[]>();
    constructor(private tumblrService: TumblrService) {
    }

    getBlogs(): Observable<Blog[]> {
        this.getSettings().then(settings => this.subject.next(settings.blogs));
        return this.subject;
    }

    setBlogs(blogs: Blog[]) {
        this.getSettings().then(settings => {
            settings.blogs = blogs;
            this.setSettings(settings);
        });
        this.subject.next(blogs);
    }

    getUpdatedInDays(): Observable<number> {
        return new Observable<number>(subscriber => {
            this.getSettings().then(settings => subscriber.next(settings.updateInDays));
        });
    }

    setUpdatedInDays(days: number) {
        this.getSettings().then(settings => {
            settings.updateInDays = days;
            this.setSettings(settings);
        });
    }

    private getSettings(): Promise<Settings> {
        return new Promise<Settings>(resolve => {
            localforage.getItem('settings').then((settings: Settings) => {
                if (settings === null) {
                    this.setSettings(new Settings(new Date(0)))
                        .then(newSettings => resolve(newSettings));
                } else if (this.isOutdated(settings)) {
                    this.setSettings(settings).then(newSettings => resolve(newSettings));
                } else {
                    resolve(settings);
                }
            });
        });
    }

    private setSettings(settings: Settings): Promise<Settings> {
        if (!this.isOutdated(settings) || settings.blogs.length === 0) {
            return localforage.setItem('settings', settings);
        }
        return new Promise<Settings>(resolve => {
            let blogObservables: Observable<Blog>[] = [];
            settings.blogs.forEach(blog => {
                blogObservables.push(this.tumblrService.getBlogInfo(blog.name));
            });
            settings.blogs = [];
            let observable = new Observable<Blog>().concat(blogObservables);
            console.log(observable);
            observable.subscribe((blog: Blog) => {
                    settings.blogs.push(blog);
            },
                error => {}, () => {
                    settings.lastUpdated = new Date();
                    localforage.setItem('settings', settings)
                        .then(newSettings => resolve(newSettings));
                });
        });
    }

    private isOutdated(settings: Settings): boolean {
        return (Date.now() - settings.lastUpdated.getTime()) / (1000 * 60 * 60 * 24) > 0.25;
    }
}
