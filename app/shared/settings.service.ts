import {Injectable} from '@angular/core';
import {Blog} from "../data.types";
import {localforage} from "../data.types";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SettingsService {
    private subject: Subject<Blog[]> = new Subject<Blog[]>();
    getBlogs(): Observable<Blog[]>{
        localforage.getItem("blogs").then((blogs: Blog[]) => this.subject.next(blogs));
        return this.subject;
    }

    setBlogs(blogs: Blog[]){
        localforage.setItem("blogs", blogs);
        this.subject.next(blogs);
    }
}