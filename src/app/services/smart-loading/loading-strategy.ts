export abstract class LoadingStrategy {
    abstract reset(): void;

    abstract async loadItems(queue: (() => Promise<void>)[]): Promise<void>;

    protected sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
