import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Blog, Settings } from '../data.types';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TumblrService } from './tumblr.service';
import { Subscriber } from 'rxjs/Subscriber';

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
        return new Observable<Blog[]>((subscriber: Subscriber<Blog[]>) => {
            this.getSettings().then(settings => {
                settings.blogs = blogs;
                this.setSettings(settings)
                    .subscribe(storedSettings => {
                        this.subjectBlogs.next(storedSettings.blogs);
                        subscriber.next(storedSettings.blogs);
                    }, error => subscriber.error(error), () => subscriber.complete());
            });
        });
    }

    getUpdatedInDays(): Observable<number> {
        this.getSettings().then(settings => this.subjectUpdate.next(settings.updatedInDays));
        return this.subjectUpdate;
    }

    setUpdatedInDays(days: number): Observable<number> {
        return new Observable<number>((subscriber: Subscriber<number>) => {
            this.getSettings().then(settings => {
                settings.updatedInDays = days;
                this.setSettings(settings)
                    .subscribe(storedSettings => {
                        this.subjectUpdate.next(storedSettings.updatedInDays);
                        subscriber.next(storedSettings.updatedInDays);
                    }, error => subscriber.error(error), () => subscriber.complete());
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
                        .subscribe(newSettings => resolve(newSettings));
                } else if (this.isOutdated(new Date(settings.lastUpdated))) {
                    this.setSettings(this.numberToDate(settings))
                        .subscribe(newSettings => resolve(newSettings));
                } else {
                    resolve(this.numberToDate(settings));
                }
            });
        });
    }

    private setSettings(settings: Settings): Observable<Settings> {
        if (settings.blogs.length === 0) {
            return new Observable<Settings>((subscriber: Subscriber<Settings>) => {
                localforage.setItem('settings', this.dateToNumber(settings))
                    .then(storedSettings => subscriber.next(this.numberToDate(storedSettings)));
            });
        }
        return new Observable<Settings>((subscriber: Subscriber<Settings>) => {
            const blogObservables: Observable<Blog | null>[] = [];
            const errors: string[] = [];
            settings.blogs.forEach(blog => {
                blogObservables.push(this.tumblrService.getBlogInfo(blog.name)
                    .catch(() => {
                        errors.push('Blog \'' + blog.name + '\' not found');
                        return Observable.of(null);
                    }));
            });

            Observable.forkJoin(blogObservables).subscribe(blogs => {
                    settings.blogs = <Blog[]> blogs.filter(element => element != null);
                    settings.lastUpdated = new Date();
                    localforage.setItem('settings', this.dateToNumber(settings))
                        .then(newSettings => {
                            subscriber.next(this.numberToDate(newSettings));
                            if (errors.length === 0) {
                                subscriber.complete();
                            } else {
                                subscriber.error(errors);
                            }
                        });
                });
        });
    }

    private isOutdated(lastUpdated: Date): boolean {
        return (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24) > 0.25;
    }

    private dateToNumber(settings: Settings): any {
        const settingsConverted = <any> settings;
        settingsConverted.lastUpdated = settings.lastUpdated.getTime();
        settingsConverted.blogs.forEach((blog: any) => blog.updated = blog.updated.getTime());
        return settingsConverted;
    }

    private numberToDate(settings: any): Settings {
        settings.lastUpdated = new Date(settings.lastUpdated);
        settings.blogs.forEach((blog: any) => blog.updated = new Date(blog.updated));
        return settings;
    }
}
