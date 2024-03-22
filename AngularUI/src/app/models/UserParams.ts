export class UserParams {

  pageNumber = 1;
  pageSize = 2;
  startDate = new Date('2008-01-01').toISOString().substring(0, 10)
  endDate = new Date().toISOString().substring(0, 10)

  constructor() {
  }
}
