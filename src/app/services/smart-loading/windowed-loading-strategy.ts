import {LoadingStrategy} from './loading-strategy';

export class WindowedLoadingStrategy extends LoadingStrategy {
    private windowSize: number;
    private window: (Promise<void> | undefined)[];
    private highestQueueIndex: number;
    private counter: number = 0;

    constructor(windowSize: number) {
        super();
        this.windowSize = windowSize;
        this.window = new Array(windowSize);
        this.highestQueueIndex = 0;
    }

    reset(): void {
        this.window = new Array(this.windowSize);
        this.highestQueueIndex = 0;
    }

    async loadItems(queue: (() => Promise<void>)[]): Promise<void> {
        if (queue[this.highestQueueIndex] === undefined) {
            // Don't use too much CPU
            await this.sleep(100);

            return;
        }

        this.counter++;
        await new Promise(resolve => {
            for (let index = 0; index < this.window.length; index++) {
                // load the next item from the queue if there is an empty spot in the queue
                if (this.window[index] === undefined) {
                    if (queue[this.highestQueueIndex] === undefined) {
                        return;
                    }

                    this.window[index] = queue[this.highestQueueIndex]();
                    this.highestQueueIndex++;
                }

                // empty the queue spot and resolve once the first promise is finished
                const counterCopy = this.counter;
                this.window[index]!.then(() => {
                    // if the counters don't match, this promise has already been resolved
                    if (counterCopy === this.counter) {
                        this.window[index] = undefined;
                        resolve();
                    }
                });
            }
        });

        return;
    }
}
