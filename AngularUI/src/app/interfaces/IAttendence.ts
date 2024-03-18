import { IEmployee } from './IEmployee';

export interface IAttendence {
  empId: number;
  day: Date;
  arrival: Date;
  departure: Date;
}
