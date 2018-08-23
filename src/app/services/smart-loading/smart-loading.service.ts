import {Injectable} from '@angular/core';
import {LoadingStrategy} from './loading-strategy';
import {SerialLoadingStrategy} from './serial-loading-strategy';

@Injectable({
    providedIn: 'root'
})
export class SmartLoadingService {

    private queue: (() => Promise<void>)[] = [];
    private loadingStrategy: LoadingStrategy;

    constructor() {
        this.loadingStrategy = new SerialLoadingStrategy();
        this.trackItems();
    }

    register(index: number, loadFunction: () => Promise<void>) {
        this.queue[index] = loadFunction;
    }

    clearLoadingQueue() {
        this.queue = [];
        this.loadingStrategy.reset();
    }

    private async trackItems() {
        while (true) {
            await this.loadingStrategy.loadItems(this.queue);
        }
    }
}
