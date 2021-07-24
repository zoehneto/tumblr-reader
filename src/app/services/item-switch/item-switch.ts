export abstract class ItemSwitch<T> {
    protected loadMoreItems: (() => Promise<T[]>) | undefined;

    public setLoadMoreItemsCallback(loadMoreItems?: () => Promise<T[]>) {
        this.loadMoreItems = loadMoreItems;
    }

    public showPreviousItem(items: T[]) {
        this.showItem(items, -1);
    }

    public showNextItem(items: T[]) {
        this.showItem(items, 1);
    }

    protected showItem(items: T[], modifier: number): void {
        const currentItemIndex = this.getCurrentItemIndex(items);
        if (currentItemIndex !== null) {
            const nextItemIndex = currentItemIndex + modifier;

            if (this.loadMoreItems && this.moreItemsNeeded(items, currentItemIndex,
                nextItemIndex)) {
                this.loadMoreItems().then(updatedItems => {
                    this.switchToItem(updatedItems[nextItemIndex]);
                }).catch(() => {
                    //Ignore error
                });
            }

            if (nextItemIndex > -1 && nextItemIndex < items.length) {
                this.switchToItem(items[nextItemIndex]);
            }
        }
    }

    protected abstract getCurrentItemIndex(items: T[]): number | null;

    protected abstract moreItemsNeeded(items: T[], currentItemIndex: number,
                                       nextItemIndex: number): boolean;

    protected abstract switchToItem(item: T): void;
}
