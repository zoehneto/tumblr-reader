import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SmartLoadingService {

    private queue: (() => Promise<void>)[] = [];
    private queueIndex: number = 0;

    constructor() {
        this.trackItems();
    }

    register(index: number, loadFunction: () => Promise<void>) {
        this.queue[index] = loadFunction;
    }

    clearLoadTracker() {
        this.queue = [];
        this.queueIndex = 0;
    }

    private async trackItems() {
        while (true) {
            if (this.queue[this.queueIndex] === undefined) {
                // Don't use too much CPU
                await this.sleep(50);

                continue;
            }
            await this.queue[this.queueIndex]();

            this.queueIndex++;
        }
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
