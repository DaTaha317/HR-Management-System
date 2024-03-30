
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { calculateAge } from 'src/app/calculateAge';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { TimeUtility } from 'src/environments/TimeUtility';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  allCountries: string[] = [];
  validationUpdateEmployee: FormGroup;
  selectedEmployee = {} as IEmployee;
  employees: IEmployee[] = [];
  departments: IDepartment[] = [];
  updateFormData = {} as IEmployee;
  modalRef?: BsModalRef; // this is a reference to bootstrap modal

  constructor(
    private modalService: BsModalService,

    private router: Router,
    private employeeService: EmpServicesService,
    private employeeServices: EmpServicesService,
    private departmentServices: DeptServicesService,
    private toastr: ToastrService,

    private formBuilder: FormBuilder
  ) {
    this.validationUpdateEmployee = formBuilder.group({
      ssn: ["", [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern('[0-9]{14}')]],
      fullName: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      address: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, this.validatePhoneNumber, Validators.pattern('[0-9]{11}')]],
      gender: ["", Validators.required],
      nationality: ["", Validators.required],
      birthDate: ["", [Validators.required, this.validateBirthDate]],
      contractDate: ["", [Validators.required, this.contractDateValidator]],
      baseSalary: ["", [Validators.required, Validators.pattern('[0-9]*'), this.BasedSalaryValidation]],
      arrival: ["", Validators.required],
      departure: ["", Validators.required],
      departmentName: ["", Validators.required],

    })
  }
  validatePhoneNumber(control: FormControl) {
    const phoneNumber = control.value;
    const isValidPhoneNumber = /^\d{11}$/.test(phoneNumber);
    if (!isValidPhoneNumber && isNaN(Number(phoneNumber))) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  validateBirthDate(control: any) {
    const birthDate = new Date(control.value);
    const now = new Date();
    if (isNaN(birthDate.getTime())) {
      return { invalidDate: true };
    }
    const age = calculateAge(birthDate, now);
    if (age < 20) {
      return { minAge: true };
    }
    return null;
  }

  contractDateValidator(control: any) {

    const startDate = new Date('2008-01-01');
    const currentDate = new Date();
    const contractDate = new Date(control.value);

    if (contractDate < startDate || contractDate > currentDate) {

      return { 'invalidContractDate': true };
    }




    return null;
  };
  BasedSalaryValidation(control: any) {
    const value = control.value;
    if (value === 0) {
      return { 'nonZeroViolation': true };
    }
    return null;
  }



  get address() {
    return this.validationUpdateEmployee.get("address")
  }
  get fullName() {
    return this.validationUpdateEmployee.get("fullName")
  }
  get phoneNumber() {
    return this.validationUpdateEmployee.get("phoneNumber")
  }
  get gender() {
    return this.validationUpdateEmployee.get("gender")
  }
  get nationality() {
    return this.validationUpdateEmployee.get("nationality")
  }
  get birthDate() {
    return this.validationUpdateEmployee.get("birthDate")
  }
  get contractDate() {
    return this.validationUpdateEmployee.get("contractDate")
  }
  get baseSalary() {
    return this.validationUpdateEmployee.get("baseSalary")
  }
  get arrival() {
    return this.validationUpdateEmployee.get("arrival")
  }
  get departure() {
    return this.validationUpdateEmployee.get("departure")
  }
  get departmentName() {
    return this.validationUpdateEmployee.get("departmentName")
  }
  get ssn() {
    return this.validationUpdateEmployee.get("ssn")
  }
  ngOnInit(): void {
    this.selectedEmployee = history.state.employee;
    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
    this.allCountries = this.employeeService.allCountriesList;
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
  UpdateEmployeeBtn(emp: IEmployee) {

    this.updateFormData = emp;

    this.update(this.updateFormData)
    this.modalRef?.hide();

  }
  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void>, emb: IEmployee) {
    this.updateFormData = emb;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
