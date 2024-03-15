import { IDepartment } from './IDepartment';

export interface IEmployee {
  ssn: number;
  fullName: string;
  address: string;
  phoneNumber: string;
  gender: Gender;
  nationality: string;
  birthDate: Date;
  contractDate: Date;
  baseSalary: number;
  arrival: Date;
  departure: Date;
  deptId?: number;
  department?: IDepartment; // Navigation property
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
