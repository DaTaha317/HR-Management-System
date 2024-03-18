import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAttendence } from 'src/app/interfaces/IAttendence';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { TimeUtility } from 'src/environments/TimeUtility';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css'],
})
export class AddAttendanceComponent implements OnInit {
  employees: IEmployee[] = [];
  attendance: any = {};
  selectedEmpId: number | undefined;
  isPresent = false;
  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmpServicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService
      .getEmployees()
      .subscribe((emps) => (this.employees = emps as IEmployee[]));
  }
  onSubmit() {
    if (this.attendance.status == 0) {
      this.attendance.arrival = TimeUtility.formatTime(this.attendance.arrival);
      this.attendance.departure = TimeUtility.formatTime(
        this.attendance.departure
      );
    }

    this.attendance.day = TimeUtility.today();
    this.attendance.empId = this.selectedEmpId;
    console.log(this.attendance);
    this.attendanceService
      .addAttendance(this.attendance)
      .subscribe(() => this.toastr.success('Added successfully'));
  }

  onStatusChange() {
    if (this.attendance.status == 0) {
      this.isPresent = true;
    } else {
      this.isPresent = false;
    }
  }
}
