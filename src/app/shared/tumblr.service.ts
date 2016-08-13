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
                let response: Response = res.json().response;
                response.posts.forEach(post => post.date = new Date(post.date));
                return response;
            });
    }
}
