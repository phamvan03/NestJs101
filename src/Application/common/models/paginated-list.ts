export class PaginatedList<T> {
  public items: T[];
  public totalPages: number;
  public totalCount: number;
  public lastEvaluatedKey: object | null;

  constructor(
    items: T[],
    count: number,
    lastEvaluatedKey: object | null,
    pageSize: number,
  ) {
    this.items = items;
    this.totalPages = Math.ceil(count / pageSize);
    this.lastEvaluatedKey = lastEvaluatedKey;
    this.totalCount = count;
  }
}
