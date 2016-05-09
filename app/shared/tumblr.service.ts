import {Injectable} from '@angular/core';
import {ConfigService} from "./config.service";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Response} from "./../data.types";
import {Observer} from "rxjs/Observer";

@Injectable()
export class TumblrService {
    private _apiKey: Observable<string>;
    private _baseUrl = "https://api.tumblr.com/v2/";
    constructor(private _configService: ConfigService, private _http: Http){
        this._apiKey = _configService.getApiKey()
    }

    getPosts(blogId: string): Observable<Response>{
        return Observable.create((observer: Observer<Response>) => {
            this._apiKey.subscribe(key => {
                this._http.get(this._baseUrl+"blog/"+blogId+"/posts?api_key="+key)
                    .map(res => res.json().response).subscribe(x => {
                    observer.next(x);
                    observer.complete();
                });
            })
        });
    }
}