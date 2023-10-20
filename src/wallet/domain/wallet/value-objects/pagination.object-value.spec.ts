import { Pagination } from './pagination.object-value';

describe('pagination tests units', () => {
  it('should create pagination', () => {
    const pagination = new Pagination({
      totalDocs: 50,
      page: 1,
      size: 5,
      totalPages: 10,
    });
    expect(pagination.totalDocs).toEqual(50);
    expect(pagination.page).toEqual(1);
    expect(pagination.size).toEqual(5);
    expect(pagination.totalPages).toEqual(10);
  });
});
