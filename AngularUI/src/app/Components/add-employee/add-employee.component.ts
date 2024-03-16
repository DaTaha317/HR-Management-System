import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeptServicesService } from 'src/app/Services/dept-services.service';
import { EmpServicesService } from 'src/app/Services/emp-services.service';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { ReactiveFormsModule } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/IEmployee';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent  implements OnInit {
  employeeDTO: any = {};
  selectedDepartment: string='';
  departments: IDepartment[] = [];
  constructor(private formBuilder:FormBuilder,private employeeService:EmpServicesService,private departmentServices:DeptServicesService){
  }
  ngOnInit(): void {
    this.departmentServices.apiCall().subscribe((data) => {
      console.warn("Departments", data);
      this.departments = data as IDepartment[];
    });
  }

  onSubmit() {  
    this.employeeDTO.departmentName = this.selectedDepartment;
    console.log(this.employeeDTO);
    this.employeeService.addEmployee(this.employeeDTO).subscribe((data) => {
      console.log('Employee added successfully:', data); });
  }
}
