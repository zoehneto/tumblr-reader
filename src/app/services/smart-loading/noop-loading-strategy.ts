import {LoadingStrategy} from './loading-strategy';
import {LoadingHandler} from './loading-handler';

export class NoopLoadingStrategy implements LoadingStrategy {
    private queueIndex: number;

    reset(): void {
        this.queueIndex = 0;
    }

    async loadItems(queue: LoadingHandler[]): Promise<boolean> {
        if (queue[this.queueIndex] === undefined) {
            return false;
        }

        queue[this.queueIndex].startLoading();
        this.queueIndex++;

        return queue[this.queueIndex] !== undefined;
    }
}
