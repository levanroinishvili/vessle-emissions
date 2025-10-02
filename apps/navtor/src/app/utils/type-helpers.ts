export type ListedValueOf<T> = T extends ReadonlyArray<infer Item> ? Item : unknown
