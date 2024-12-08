"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedList = void 0;
class PaginatedList {
    constructor(items, count, lastEvaluatedKey, pageSize) {
        this.items = items;
        this.totalPages = Math.ceil(count / pageSize);
        this.lastEvaluatedKey = lastEvaluatedKey;
        this.totalCount = count;
    }
}
exports.PaginatedList = PaginatedList;
//# sourceMappingURL=paginated-list.js.map