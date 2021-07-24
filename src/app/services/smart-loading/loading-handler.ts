export class LoadingHandler {
    public loadAllowed = false;
    private loadCounter = 0;
    private errorCounter = 0;
    private loadingFinished: () => void;

    // If the itemCount is 0 loading is automatically finished
    constructor(private itemCount: number) {
    }

    // To be called by the loading strategy
    public startLoading(): Promise<void> {
        if (this.itemCount !== 0) {
            const promise = new Promise<void>(resolve => this.loadingFinished = resolve);
            this.loadAllowed = true;
            return promise;
        }
        return Promise.resolve();
    }

    // To be called by the component if an element is loaded successfully
    public elementLoadSuccess(event: any) {
        this.loadCounter++;
        this.handleLoading();
    }

    // To be called by the component if an element fails to load
    public elementLoadError(event: any) {
        this.errorCounter++;
        this.handleLoading();
    }


    private handleLoading() {
        if (this.loadCounter + this.errorCounter === this.itemCount) {
            this.loadingFinished();
        }
    }
}
