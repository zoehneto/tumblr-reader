import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Response, config } from '../data.types';

@Injectable()
export class TumblrService {
    private baseUrl = 'https://api.tumblr.com/v2/';
    constructor( private jsonp: Jsonp) {
    }

    getPosts(blogId: string, offset: number = 0, tag?: string, id?: number): Observable<Response> {
        let params = new URLSearchParams();
        params.set('api_key', config.consumerKey);
        params.set('reblog_info', 'True');
        params.set('notes_info', 'True');
        params.set('jsonp', 'JSONP_CALLBACK');
        params.set('limit', '10');
        params.set('offset', offset.toString());
        if (tag) {
            params.set('tag', tag);
        }
        if (id) {
            params.set('id', id.toString());
        }

        return this.jsonp.get(this.baseUrl + 'blog/' + blogId + '/posts', { search: params })
            .map(res => {
                let response = res.json().response;
                response.posts.forEach((post: any) => {
                    this.postDateTransform(post);
                    this.postNoteTransform(post);
                });
                return response;
            });
    }

    private postDateTransform(post: any) {
        post.date = new Date(post.date);
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
