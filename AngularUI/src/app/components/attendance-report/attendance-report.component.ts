import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAttendence } from 'src/app/interfaces/IAttendence';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
})
export class AttendanceReportComponent implements OnInit {
  attendanceReport: IAttendence[] = [];
  constructor(
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAttendanceReport();
  }

  getAttendanceReport() {
    this.attendanceService.getAll().subscribe((report) => {
      this.attendanceReport = report;
    });
  }

  deleteRecord(id: number): void {
    this.attendanceService.deleteRecord(id).subscribe(() => {
      this.toastr.success('Deleted Successfully');
    });
  }
}
