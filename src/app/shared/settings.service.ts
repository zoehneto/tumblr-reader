import { Injectable } from '@angular/core';
import { Blog, localforage, Settings } from '../data.types';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TumblrService } from './tumblr.service';

@Injectable()
export class SettingsService {
    private subjectBlogs: Subject<Blog[]> = new Subject<Blog[]>();
    private subjectUpdate: Subject<number> = new Subject<number>();
    constructor(private tumblrService: TumblrService) {
    }

    getBlogs(): Observable<Blog[]> {
        this.getSettings().then(settings => this.subjectBlogs.next(settings.blogs));
        return this.subjectBlogs;
    }

    setBlogs(blogs: Blog[]): Observable<Blog[]> {
        return new Observable<Blog[]>(subscriber => {
            this.getSettings().then(settings => {
                settings.blogs = blogs;
                this.setSettings(settings)
                    .then(storedSettings => {
                        this.subjectBlogs.next(storedSettings.blogs);
                        subscriber.next(storedSettings.blogs);
                        subscriber.complete();
                    });
            });
        });
    }

    getUpdatedInDays(): Observable<number> {
        this.getSettings().then(settings => this.subjectUpdate.next(settings.updatedInDays));
        return this.subjectUpdate;
    }

    setUpdatedInDays(days: number): Observable<number> {
        return new Observable<number>(subscriber => {
            this.getSettings().then(settings => {
                settings.updatedInDays = days;
                this.setSettings(settings)
                    .then(storedSettings => {
                        this.subjectUpdate.next(storedSettings.updatedInDays);
                        subscriber.next(storedSettings.updatedInDays);
                        subscriber.complete();
                    });
            });
        });
    }

    isUpdatedInDays(date: Date, days: number) {
        return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24) < days;
    }

    private getSettings(): Promise<Settings> {
        return new Promise<Settings>(resolve => {
            localforage.getItem('settings').then((settings: any) => {
                if (settings === null) {
                    this.setSettings(new Settings(new Date(0)))
                        .then(newSettings => resolve(newSettings));
                } else if (this.isOutdated(new Date(settings.lastUpdated))) {
                    this.setSettings(this.numberToDate(settings))
                        .then(newSettings => resolve(newSettings));
                } else {
                    resolve(this.numberToDate(settings));
                }
            });
        });
    }

    private setSettings(settings: Settings): Promise<Settings> {
        if (settings.blogs.length === 0) {
            return new Promise<Settings>(resolve => {
                localforage.setItem('settings', this.dateToNumber(settings))
                    .then(storedSettings => resolve(this.numberToDate(storedSettings)));
            });
        }
        return new Promise<Settings>(resolve => {
            let blogObservables: Observable<Blog>[] = [];
            settings.blogs.forEach(blog => {
                blogObservables.push(this.tumblrService.getBlogInfo(blog.name));
            });

            Observable.forkJoin(blogObservables).subscribe(blogs => {
                    settings.blogs = blogs;
                    settings.lastUpdated = new Date();
                    localforage.setItem('settings', this.dateToNumber(settings))
                        .then(newSettings => resolve(this.numberToDate(newSettings)));
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
