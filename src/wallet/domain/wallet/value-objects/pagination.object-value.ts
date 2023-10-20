export class Pagination {
  private _totalDocs: number;
  private _page: number;
  private _size: number;
  private _totalPages: number;

  constructor(props: {
    totalDocs: number;
    page: number;
    size: number;
    totalPages: number;
  }) {
    this._page = props.page;
    this._size = props.size;
    this._totalDocs = props.totalDocs;
    this._totalPages = props.totalPages;
  }

  get page(): number {
    return this._page;
  }

  get size(): number {
    return this._size;
  }

  get totalDocs(): number {
    return this._totalDocs;
  }

  get totalPages(): number {
    return this._totalPages;
  }
}
