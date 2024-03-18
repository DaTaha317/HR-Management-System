import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { ReactiveFormsModule } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { ToastrService } from 'ngx-toastr';
import { TimeUtility } from 'src/environments/TimeUtility';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employeeDTO: any = {};
  selectedDepartment: string = '';
  departments: IDepartment[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmpServicesService,
    private departmentServices: DeptServicesService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
  }

  onSubmit() {
    // Format clock in and clock out times
    this.employeeDTO.arrival = TimeUtility.formatTime(this.employeeDTO.arrival);
    this.employeeDTO.departure = TimeUtility.formatTime(
      this.employeeDTO.departure
    );
    this.employeeDTO.departmentName = this.selectedDepartment;
    this.employeeService.addEmployee(this.employeeDTO).subscribe((data) => {
      this.toastr.success('An Employee has been added');
    });
  }
}
