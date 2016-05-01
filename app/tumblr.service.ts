import {Injectable} from 'angular2/core';
import {ConfigService} from "./config.service";
import {Observable} from "rxjs/Observable";
import {Post} from "./data.types";
import {Http} from "angular2/http";

@Injectable()
export class TumblrService {
    private _apiKey: Observable<string>;
    private _baseUrl = "https://api.tumblr.com/v2/";
    constructor(private _configService: ConfigService, private _http: Http){
        this._apiKey = _configService.getApiKey()
    }


    getPosts(id: string): Observable<any>{
        return this._apiKey.map(key => {
            _this._http.get(this._baseUrl+"blog/"+id+"/posts?api_key="+key)
                .map(res => res.json());
        });
    }
}