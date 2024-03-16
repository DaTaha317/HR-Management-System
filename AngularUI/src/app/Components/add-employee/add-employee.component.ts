import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { ReactiveFormsModule } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/IEmployee';

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
    private departmentServices: DeptServicesService
  ) {}
  ngOnInit(): void {
    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
  }

  onSubmit() {
    // Format clock in and clock out times
    this.employeeDTO.arrival = this.formatTime(this.employeeDTO.arrival);
    this.employeeDTO.departure = this.formatTime(this.employeeDTO.departure);
    this.employeeDTO.departmentName = this.selectedDepartment;
    this.employeeService.addEmployee(this.employeeDTO).subscribe((data) => {});
  }

  private formatTime(timeValue: string): string {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeValue.split(':');

    // Format the time in HH:mm:ss format
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }
}
