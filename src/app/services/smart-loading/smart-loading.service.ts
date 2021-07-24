import {Injectable} from '@angular/core';
import {LoadingStrategy} from './loading-strategy';
import {WindowedLoadingStrategy} from './windowed-loading-strategy';
import {LoadingHandler} from './loading-handler';

@Injectable({
    providedIn: 'root'
})
export class SmartLoadingService {

    private queue: LoadingHandler[] = [];
    private loadingStrategy: LoadingStrategy;

    constructor() {
        this.loadingStrategy = new WindowedLoadingStrategy(2);
    }

    async register(index: number, loadingHandler: LoadingHandler) {
        this.queue[index] = loadingHandler;
        while (await this.loadingStrategy.loadItems(this.queue)) {
            // Continuously load new items
        }
    }

    clearLoadingQueue() {
        this.queue = [];
        this.loadingStrategy.reset();
    }

}
