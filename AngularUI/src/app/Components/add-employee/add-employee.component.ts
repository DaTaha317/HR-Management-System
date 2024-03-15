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
  EmployeeForm:FormGroup;
  Employees:IEmployee[]=[];
  departments: IDepartment[] = [];
  constructor(private formBuilder:FormBuilder,private employeeService:EmpServicesService,private departmentServices:DeptServicesService){
    this.EmployeeForm=this.formBuilder.group({
      fullName:['',Validators.required],
      address:['',Validators.required],
      phoneNumber:['',Validators.required],
      getgender:['',Validators.required],
      gender: [''],
      nationality:['',Validators.required],
      birthDate:['',Validators.required],
      contractDate:['',Validators.required],
      baseSalary:['',Validators.required],
      arrival:['',Validators.required],
      departure:['',Validators.required],
      deptId: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]]
    })
  }
  ngOnInit(): void {
    this.departmentServices.apiCall().subscribe((data) => {
      console.warn("Departments", data);
      this.departments = data as IDepartment[];
    });
    this.employeeService.apiCall().subscribe((data) => {
      console.warn("Employees", data);
      this.Employees = data as IEmployee[];
    });
  }

  onSubmit() {
    if (this.EmployeeForm.value.getgender === 'male') {
      this.EmployeeForm.patchValue({ gender: 0 });
    } else if (this.EmployeeForm.value.getgender === 'female') {
      this.EmployeeForm.patchValue({ gender: 1 });
    }    
  
    if (this.EmployeeForm.valid) {
      const selectedDeptId = this.EmployeeForm.get('deptId')?.value;
      const selectedDept = this.departments.find(dept => dept.id === selectedDeptId);
      const employeeData = { ...this.EmployeeForm.value };
      if (employeeData.department !== '') {
        
        // const employeeData = {
        //   FullName: this.EmployeeForm.get('fullName')?.value,
        //   Address: this.EmployeeForm.get('address')?.value,
        //   PhoneNumber: this.EmployeeForm.get('phoneNumber')?.value,
        //   Gender: this.EmployeeForm.get('gender')?.value,
        //   Nationality: this.EmployeeForm.get('nationality')?.value,
        //   BirthDate: this.EmployeeForm.get('birthDate')?.value,
        //   ContractDate: this.EmployeeForm.get('contractDate')?.value,
        //   BaseSalary: this.EmployeeForm.get('baseSalary')?.value,
        //   Arrival: this.EmployeeForm.get('arrival')?.value,
        //   Departure: this.EmployeeForm.get('departure')?.value,
        //   DeptId: selectedDeptId,
        //   DepartmentName: selectedDept ? selectedDept.name : ''
        // };
        const employeeDTO = { employeeDTO: employeeData };
        console.log(employeeData);
        this.employeeService.addEmployee(employeeDTO).subscribe((response) => {
          console.log('Employee added successfully:', response);
          this.EmployeeForm.reset();
        });
      } else {
        console.error('Please select a department before submitting.');
      }
    }
  }
  

}
