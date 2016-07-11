import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {Observable} from "rxjs/Observable";
import {Jsonp, URLSearchParams} from "@angular/http";
import {Response} from "./../data.types";
import {Observer} from "rxjs/Observer";

@Injectable()
export class TumblrService {
    private _apiKey: Observable<string>;
    private _baseUrl = "https://api.tumblr.com/v2/";
    constructor(private configService: ConfigService, private jsonp: Jsonp){
        this._apiKey = configService.getApiKey()
    }

    getPosts(blogId: string, offset: number = 0, tag?: string, id?: number): Observable<Response>{
        return Observable.create((observer: Observer<Response>) => {
            this._apiKey.subscribe(key => {
                let params = new URLSearchParams();
                params.set('api_key', key);
                params.set('reblog_info', 'True');
                params.set('jsonp', 'JSONP_CALLBACK');
                params.set('limit', '10');
                params.set('offset', offset.toString());
                if(tag){
                    params.set('tag', tag);
                }
                if(id){
                    params.set('id', id.toString());
                }
                
                this.jsonp.get(this._baseUrl+"blog/"+blogId+"/posts", { search: params })
                    .map(res => {
                        let response: Response = res.json().response;
                        response.posts.forEach(post => post.date = new Date(post.date));
                        return response;
                    }).subscribe(x => {
                        observer.next(x);
                        observer.complete();
                    }, e => {
                        observer.error(e);
                        observer.complete();
                    });
            })
        });
    }
}