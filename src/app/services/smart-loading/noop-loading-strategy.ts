import {LoadingStrategy} from './loading-strategy';

export class NoopLoadingStrategy implements LoadingStrategy {
    private queueIndex: number;

    reset(): void {
        this.queueIndex = 0;
    }

    async loadItems(queue: (() => Promise<void>)[]): Promise<boolean> {
        if (queue[this.queueIndex] === undefined) {
            return false;
        }

        queue[this.queueIndex]();
        this.queueIndex++;

        return queue[this.queueIndex] !== undefined;
    }
}
