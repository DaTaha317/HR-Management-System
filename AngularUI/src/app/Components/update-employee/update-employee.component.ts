import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { TimeUtility } from 'src/environments/TimeUtility';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  selectedEmployee = {} as IEmployee;
  employees: IEmployee[] = [];
  departments: IDepartment[] = [];
  updateFormData = {} as IEmployee;
  constructor(
    private router: Router,
    private employeeServices: EmpServicesService,
    private departmentServices: DeptServicesService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.selectedEmployee = history.state.employee;
    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
  }
  update(employee: IEmployee) {
    employee.arrival = TimeUtility.formatTime(employee.arrival);
    employee.departure = TimeUtility.formatTime(employee.departure);
    this.employeeServices.updateEmployee(employee.id, employee).subscribe(
      (response) => {
        this.toastr.success('Updated Successfully');
        this.router.navigate(['/employee/display']);
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }
}
