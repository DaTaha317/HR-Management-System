import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { EmpServicesService } from 'src/app/services/emp-services.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit{
  employees:IEmployee[]=[];
  constructor(private employeeService:EmpServicesService,private router:Router){}
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      console.warn("Employees", data);
      this.employees = data as IEmployee[];
      console.log(this.employees);
    });
  }
  deleteEmployee(id: number):void {
    this.employeeService.deleteEmployee(id).subscribe(
      ()=>{
        this.employees=this.employees.filter(emp=>emp.id!==id);
      }
    );
  }
  updateForm(employee:IEmployee){
    console.log("hello");
    this.router.navigate(['/UpdateEmployee'],{state:{employee}});
    console.log(employee);
  }
  trackByFn(index:number, employee:IEmployee) {
    return employee.id; 
  }
}
