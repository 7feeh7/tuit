export interface PaginationParams<T = unknown> {
    page?: number
    limit?: number
    search?: string
    filter?: T
}