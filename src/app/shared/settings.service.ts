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
            localforage.getItem('settings').then((settings: any) => {
                if (settings === null) {
                    this.setSettings(new Settings(new Date(0)))
                        .then(newSettings => resolve(this.numberToDate(newSettings)));
                } else if (this.isOutdated(new Date(settings.lastUpdated))) {
                    this.setSettings(this.numberToDate(settings))
                        .then(newSettings => resolve(this.numberToDate(newSettings)));
                } else {
                    resolve(this.numberToDate(settings));
                }
            });
        });
    }

    private setSettings(settings: Settings): Promise<Settings> {
        if (settings.blogs.length === 0) {
            return localforage.setItem('settings', this.dateToNumber(settings));
        }
        return new Promise<Settings>(resolve => {
            let blogObservables: Observable<Blog>[] = [];
            settings.blogs.forEach(blog => {
                blogObservables.push(this.tumblrService.getBlogInfo(blog.name));
            });

            Observable.forkJoin(...blogObservables).subscribe(
                (blogs: Blog[]) => {
                    settings.blogs = blogs;
                },
                error => {},
                () => {
                    settings.lastUpdated = new Date();
                    localforage.setItem('settings', this.dateToNumber(settings))
                        .then(newSettings => resolve(newSettings));
                });
        });
    }

    private isOutdated(lastUpdated: Date): boolean {
        return (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24) > 0.25;
    }

    private dateToNumber(settings: Settings): any {
        let settingsConverted = <any> settings;
        settingsConverted.lastUpdated = settings.lastUpdated.getTime();
        settingsConverted.blogs.forEach(blog => blog.updated = blog.updated.getTime());
        return settingsConverted;
    }

    private numberToDate(settings: any): Settings {
        settings.lastUpdated = new Date(settings.lastUpdated);
        settings.blogs.forEach(blog => blog.updated = new Date(blog.updated));
        return settings;
    }
}
