export declare class PaginatedList<T> {
    items: T[];
    totalPages: number;
    totalCount: number;
    lastEvaluatedKey: object | null;
    constructor(items: T[], count: number, lastEvaluatedKey: object | null, pageSize: number);
}
