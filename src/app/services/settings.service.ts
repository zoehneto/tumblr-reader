import { forkJoin as observableForkJoin, of as observableOf,  Subject ,  Observable ,  BehaviorSubject } from 'rxjs';
import { single, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Blog } from '../data-types';
import { TumblrService } from './tumblr.service';
import { SettingsStorageService } from './settings-storage.service';

@Injectable()
export class SettingsService {
    private subjectBlogs: Subject<Blog[]> = new BehaviorSubject<Blog[]>([]);
    private subjectUpdate: Subject<number> = new BehaviorSubject(0);
    private subjectGifClickToPlay: Subject<boolean> = new BehaviorSubject(false);
    constructor(private tumblrService: TumblrService, private storageService: SettingsStorageService) {
        this.init();
    }

    private async init() {
        const settings = await this.storageService.getSettings();
        this.subjectBlogs.next(settings.blogs);
        this.subjectUpdate.next(settings.updatedInDays);
        this.subjectGifClickToPlay.next(settings.gifClickToPlay);
    }

    isUpdatedInDays(date: Date, days: number) {
        return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24) < days;
    }

    getUpdatedInDays(): Observable<number> {
        return this.subjectUpdate;
    }

    async setUpdatedInDays(days: number): Promise<void> {
        await this.storageService
            .updateSettings(days, (settings, value) => settings.updatedInDays = value);
        this.subjectUpdate.next(days);
    }

    getGifClickToPlay(): Observable<boolean> {
        return this.subjectGifClickToPlay;
    }

    async setGifClickToPlay(clickToPlayEnabled: boolean): Promise<void> {
        await this.storageService
            .updateSettings(clickToPlayEnabled, (settings, value) => settings.gifClickToPlay = value);
        this.subjectGifClickToPlay.next(clickToPlayEnabled);
    }

    getBlogs(): Observable<Blog[]> {
        return this.subjectBlogs;
    }

    async setBlogs(blogs: Blog[]): Promise<string[]> {
        const validationResult = await this.validateBlogs(blogs);

        await this.storageService
            .updateSettings(validationResult.blogs, (settings, value) => settings.blogs = value);
        this.subjectBlogs.next(validationResult.blogs);

        return validationResult.errors;
    }

    private async validateBlogs(blogs: Blog[]): Promise<{blogs: Blog[], errors: string[]}> {
        const blogObservables: Observable<Blog | null>[] = [];
        const errors: string[] = [];
        blogs.forEach(blog => {
            blogObservables.push(this.tumblrService.getBlogInfo(blog.name).pipe(
                catchError(() => {
                    errors.push('Blog \'' + blog.name + '\' not found');
                    return observableOf(null);
                })));
        });
        const resultBlogs: (Blog|null)[] = await observableForkJoin(blogObservables).pipe(single()).toPromise();
        blogs = <Blog[]> resultBlogs.filter(element => element != null);

        return {blogs: blogs, errors: errors};
    }
}
