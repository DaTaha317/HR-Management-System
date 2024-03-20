import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAttendence } from 'src/app/interfaces/IAttendence';
import { Pagination } from 'src/app/interfaces/IPagination';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
})
export class AttendanceReportComponent implements OnInit {
  pagination: Pagination | undefined;
  attendanceReport: IAttendence[] | undefined = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  constructor(
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAttendanceReport();
  }

  getAttendanceReport() {
    this.attendanceService.getAll(this.pageNumber, this.pageSize).subscribe((report) => {
      this.attendanceReport = report.result;
      this.pagination = report.pagination;
    });
  }

  deleteRecord(id: number): void {
    this.attendanceService.deleteRecord(id).subscribe(() => {
      this.toastr.success('Deleted Successfully');
    });
  }

  pageChanged(event: any) {
    // we want to make sure that the page is already changed
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      // then load the page with new pagination data
      this.getAttendanceReport();
    }
  }

}
