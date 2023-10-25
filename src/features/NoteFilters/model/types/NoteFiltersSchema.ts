export type OrderType = 'ask' | 'desk'
export interface NoteFiltersSchema {
    order: OrderType,
    search: string,
}
