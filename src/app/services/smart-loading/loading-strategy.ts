import {LoadingHandler} from './loading-handler';

export interface LoadingStrategy {
    reset(): void;

    loadItems(queue: LoadingHandler[]): Promise<boolean>;
}
