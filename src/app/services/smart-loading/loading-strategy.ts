export interface LoadingStrategy {
    reset(): void;

    loadItems(queue: (() => Promise<void>)[]): Promise<boolean>;
}
