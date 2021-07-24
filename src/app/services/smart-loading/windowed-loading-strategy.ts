import {LoadingStrategy} from './loading-strategy';
import {LoadingHandler} from './loading-handler';

export class WindowedLoadingStrategy implements LoadingStrategy {
    private windowSize: number;
    private window: (Promise<void> | undefined)[];
    private highestQueueIndex: number;
    private counter = 0;

    constructor(windowSize: number) {
        this.windowSize = windowSize;
        this.window = new Array(windowSize);
        this.highestQueueIndex = 0;
    }

    reset(): void {
        this.counter++;
        this.window = new Array(this.windowSize);
        this.highestQueueIndex = 0;
    }

    async loadItems(queue: LoadingHandler[]): Promise<boolean> {
        if (queue[this.highestQueueIndex] === undefined) {
            return false;
        }

        this.counter++;
        await new Promise<void>(resolve => {
            const counterCopy = this.counter;
            for (let index = 0; index < this.window.length; index++) {
                // load the next item from the queue if there is an empty spot in the queue
                if (this.window[index] === undefined) {
                    if (queue[this.highestQueueIndex] === undefined) {
                        return;
                    }

                    // if the counters don't match, the queue has been reset
                    if (counterCopy === this.counter) {
                        this.window[index] = queue[this.highestQueueIndex].startLoading();
                        this.highestQueueIndex++;
                    }
                }

                // empty the queue spot and resolve once the first promise is finished
                this.window[index]!.then(() => {
                    // if the counters don't match, this promise has already been resolved
                    if (counterCopy === this.counter) {
                        this.window[index] = undefined;
                        resolve();
                    }
                });
            }
        });

        return queue[this.highestQueueIndex] !== undefined;
    }
}
