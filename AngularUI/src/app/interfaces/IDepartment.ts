import { IEmployee } from './IEmployee';

export interface IDepartment {
  id: number;
  name: string;
  employees?: IEmployee[]; // Navigation property
}
