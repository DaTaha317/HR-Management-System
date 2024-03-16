import { Time } from '@angular/common';
import { IDepartment } from './IDepartment';

export interface IEmployee {
  SSN?: number;
  FullName: string;
  Address: string;
  PhoneNumber: string;
  Gender: number;
  Nationality: string;
  BirthDate: Date;
  ContractDate: Date;
  BaseSalary: number;
  Arrival: Time;
  Departure:Time;
  deptId?: number;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
