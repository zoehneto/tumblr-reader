import {LoadingStrategy} from './loading-strategy';

export class SerialLoadingStrategy extends LoadingStrategy {
    private queueIndex: number = 0;

    reset(): void {
        this.queueIndex = 0;
    }

    async loadItems(queue: (() => Promise<void>)[]): Promise<void> {
        if (queue[this.queueIndex] === undefined) {
            // Don't use too much CPU
            await this.sleep(100);

            return;
        }
        await queue[this.queueIndex]();

        this.queueIndex++;
        return;
    }
}
