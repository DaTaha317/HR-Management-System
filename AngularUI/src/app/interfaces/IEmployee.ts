import { IDepartment } from './IDepartment';

export interface IEmployee {
  SSN?: number;
  FullName: string;
  Address: string;
  PhoneNumber: string;
  Gender: Gender;
  Nationality: string;
  BirthDate: Date;
  ContractDate: Date;
  BaseSalary: number;
  Arrival: Date;
  Departure: Date;
  deptId?: number;
  department?: IDepartment; // Navigation property
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
