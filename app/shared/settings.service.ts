import {Injectable} from '@angular/core';
import {Blog} from "../data.types";

@Injectable()
export class SettingsService {
    getBlogs(): Blog[]{
        let blogs = [new Blog()];
        blogs[0].name = 'test';
        return blogs;
    }
}