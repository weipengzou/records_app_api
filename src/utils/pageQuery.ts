export class PageQuery {
  skip: number;
  take: number;
  constructor({
    pageSize = 10,
    pageNumber = 1,
  }: {
    pageSize: number;
    pageNumber: number;
  }) {
    this.skip = pageSize * (pageNumber - 1);
    this.take = pageSize;
  }
}
export type IPageQuery<T> = T & PageQueryOptions;
class PageQueryOptions {
  pageSize: number;
  pageNumber: number;
}
