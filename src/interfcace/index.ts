export type IpageQuery<T> = T & PageQuery;
interface PageQuery {
  pageSize: number;
  pageNumebr: number;
}
