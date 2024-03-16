import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  selectedEmployee={} as IEmployee;
  employees: IEmployee[] = [];
  departments:IDepartment[]=[];
  updateFormData={} as IEmployee;
  constructor(private router:Router,private employeeServices:EmpServicesService,private departmentServices:DeptServicesService){}
  ngOnInit(): void {
    this.selectedEmployee=history.state.employee;
    console.log(this.selectedEmployee);
    this.departmentServices.getDepartments().subscribe((data) => {
      console.log(data);
    this.departments = data as IDepartment[];});
  }
  update(employee:IEmployee){
    this.employeeServices.updateEmployee(employee.id,employee).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/employees']);
      }
      , (error) => {
        console.error('Error updating employee:', error);
      });
  }
}
