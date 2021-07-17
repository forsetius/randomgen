export class RollableCollection<T> {
    private length: number;

    public constructor(
        private readonly store: T[]
    ) {
        this.length = store.length;
    }

    public get(): T {
        const position = Math.floor(Math.random() * this.length);

        return this.store[position] as T;
    }
}
