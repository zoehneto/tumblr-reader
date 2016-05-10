import {Injectable} from '@angular/core';
import {Blog} from "../data.types";
import {localforage} from "../data.types";

@Injectable()
export class SettingsService {
    getBlogs(): Promise<Blog[]>{
        return localforage.getItem("blogs");
    }

    setBlogs(blogs: Blog[]){
        localforage.setItem("blogs", blogs);
    }
}