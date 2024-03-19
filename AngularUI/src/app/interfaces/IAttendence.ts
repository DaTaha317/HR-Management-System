export interface IAttendence {
  empId: number;
  day: Date;
  arrival: Date;
  departure: Date;
  status: number;
  empName: string;
  deptName: string;
}
