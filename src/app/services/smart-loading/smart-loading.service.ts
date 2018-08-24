import {Injectable} from '@angular/core';
import {LoadingStrategy} from './loading-strategy';
import {WindowedLoadingStrategy} from './windowed-loading-strategy';

@Injectable({
    providedIn: 'root'
})
export class SmartLoadingService {

    private queue: (() => Promise<void>)[] = [];
    private loadingStrategy: LoadingStrategy;

    constructor() {
        this.loadingStrategy = new WindowedLoadingStrategy(2);
    }

    async register(index: number, loadFunction: () => Promise<void>) {
        this.queue[index] = loadFunction;
        while (await this.loadingStrategy.loadItems(this.queue)) {}
    }

    clearLoadingQueue() {
        this.queue = [];
        this.loadingStrategy.reset();
    }

}
