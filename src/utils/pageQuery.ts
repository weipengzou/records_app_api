class PageQuery {
  skip: number;
  take: number;
  constructor({ pageSize, pageNumebr }) {
    pageSize ??= 10;
    pageNumebr ??= 1;
    this.skip = pageSize * (pageNumebr - 1);
    this.take = pageSize;
  }
}
