export interface IMetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: IMetaData;

  constructor(items: T, metaData: IMetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
