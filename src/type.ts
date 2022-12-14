
export type SortOptions<T> = {
    key?: keyof T,
    ignoreCase?: boolean
}

export interface CompareInfo {
    index: number
    originalStr: string
}