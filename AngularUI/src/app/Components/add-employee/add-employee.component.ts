import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { ToastrService } from 'ngx-toastr';
import { TimeUtility } from 'src/environments/TimeUtility';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { calculateAge } from 'src/app/calculateAge';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  validationEmployee: FormGroup;
  modalRef?: BsModalRef; // this is a reference to bootstrap modal
  employeeDTO: any = {};
  selectedDepartment: string = '';
  departments: IDepartment[] = [];
  allCountries: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmpServicesService,
    private departmentServices: DeptServicesService,
    private toastr: ToastrService,

    private modalService: BsModalService,
  ) {
    this.validationEmployee = formBuilder.group({
      ssn: ["", [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern('[0-9]{14}')]],
      fullName: ["", [Validators.required]],
      address: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, this.validatePhoneNumber, Validators.maxLength(11), Validators.minLength(11)]],
      gender: ["", Validators.required],
      nationality: ["", Validators.required],
      birthDate: ["", [Validators.required, this.validateBirthDate]],
      contractDate: ["", [Validators.required, this.contractDateValidator]],
      baseSalary: ["", [Validators.required, Validators.pattern('[0-9]*')]],
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
    const contractDate = new Date(control.value);

    if (contractDate < startDate) {
      console.log(contractDate)
      return { 'invalidContractDate': true };
    }
    console.log(contractDate)


    return null;
  };



  get address() {
    return this.validationEmployee.get("address")
  }
  get fullName() {
    return this.validationEmployee.get("fullName")
  }
  get phoneNumber() {
    return this.validationEmployee.get("phoneNumber")
  }
  get gender() {
    return this.validationEmployee.get("gender")
  }
  get nationality() {
    return this.validationEmployee.get("nationality")
  }
  get birthDate() {
    return this.validationEmployee.get("birthDate")
  }
  get contractDate() {
    return this.validationEmployee.get("contractDate")
  }
  get baseSalary() {
    return this.validationEmployee.get("baseSalary")
  }
  get arrival() {
    return this.validationEmployee.get("arrival")
  }
  get departure() {
    return this.validationEmployee.get("departure")
  }
  get departmentName() {
    return this.validationEmployee.get("departmentName")
  }
  get ssn() {
    return this.validationEmployee.get("ssn")
  }

  ngOnInit(): void {
    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
    this.allCountries = this.employeeService.allCountriesList;
  }

  onSubmit() {
    console.log(this.validationEmployee.value);

    // Format clock in and clock out times
    this.employeeDTO.arrival = TimeUtility.formatTime(this.employeeDTO.arrival);
    this.employeeDTO.departure = TimeUtility.formatTime(
      this.employeeDTO.departure
    );
    this.employeeDTO.departmentName = this.selectedDepartment;
    this.employeeService.addEmployee(this.employeeDTO).subscribe((data) => {
      this.toastr.success('An Employee has been added');
      this.reset();
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
  reset() {

    this.employeeDTO = {}
    this.selectedDepartment = '';

    this.validationEmployee.reset();
  }
}
