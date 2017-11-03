import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Response, config, Blog, ResponseWrapper} from '../data.types';
import * as moment from 'moment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TumblrService {
    private baseUrl = 'https://api.tumblr.com/v2/';
    constructor(private http: HttpClient) {
    }

    getBlogInfo(blogId: string): Observable<Blog> {
        let params = new HttpParams()
            .append('api_key', config.consumerKey)
            .append('jsonp', 'JSONP_CALLBACK');

        return this.http
            .jsonp<ResponseWrapper>(this.baseUrl + 'blog/' + blogId + '/info?' + params.toString(),
                'JSONP_CALLBACK')
            .map(wrapper => {
                this.blogDateTransform(wrapper.response.blog);
                return wrapper.response.blog;
            });
    }

    getPosts(blogId: string, offset: number = 0,
             tag?: string | null, id?: number | null): Observable<Response> {
        let params = new HttpParams()
            .append('api_key', config.consumerKey)
            .append('reblog_info', 'True')
            .append('notes_info', 'True')
            .append('limit', '10')
            .append('offset', offset.toString())
            .append('jsonp', 'JSONP_CALLBACK');
        if (tag) {
            params = params.append('tag', tag);
        }
        if (id) {
            params = params.append('id', id.toString());
        }

        return this.http
            .jsonp<ResponseWrapper>(this.baseUrl + 'blog/' + blogId + '/posts?' + params.toString(),
                'JSONP_CALLBACK')
            .map(wrapper => {
                this.blogDateTransform(wrapper.response.blog);
                wrapper.response.posts.forEach((post: any) => {
                    this.postDateTransform(post);
                    this.postNoteTransform(post);
                });
                return wrapper.response;
            });
    }

    private blogDateTransform(blog: any) {
        let blogDate: moment.Moment = moment.utc(blog.updated * 1000);
        blog.updated = blogDate.local().toDate();
    }

    private postDateTransform(post: any) {
        let postDate: moment.Moment = moment.utc(post.date.substring(0, post.date.lastIndexOf(' '))
            , 'YYYY-MM-DD HH:mm:ss');
        post.date = postDate.local().toDate();
    }

    private postNoteTransform(post: any) {
        post.likes = 0;
        post.replies = [];
        post.reblogs = [];
        if (post.notes) {
            post.notes.forEach((note: any) => {
                if (note.type === 'like') {
                    post.likes++;
                }
                if (note.type === 'reblog') {
                    post.reblogs.push(note);
                }
                if (note.type === 'reply') {
                    post.replies.push(note);
                }
            });
        }
    }
}
