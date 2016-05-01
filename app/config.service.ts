import {Injectable} from 'angular2/core';
import {Http} from "angular2/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConfigService {
    private _config: Observable<any>;
    constructor(private _http: Http) {
        this._config = _http.get('app/config/config.json')
            .map(res => res.json())
    }

    getApiKey(): Observable<string>{
        return this._config.map(config => config.consumerKey);
    }
}