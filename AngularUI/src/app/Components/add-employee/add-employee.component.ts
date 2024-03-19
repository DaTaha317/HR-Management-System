import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { ToastrService } from 'ngx-toastr';
import { TimeUtility } from 'src/environments/TimeUtility';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICountry } from 'src/app/interfaces/ICountry';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  modalRef?: BsModalRef; // this is a reference to bootstrap modal
  employeeDTO: any = {};
  selectedDepartment: string = '';
  departments: IDepartment[] = [];
  allCountries: string[] = [];
  constructor(
    private employeeService: EmpServicesService,
    private departmentServices: DeptServicesService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
    this.allCountries = this.employeeService.allCountriesList;
  }

  onSubmit() {

    console.log(this.employeeDTO);
    return;
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

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }



}
