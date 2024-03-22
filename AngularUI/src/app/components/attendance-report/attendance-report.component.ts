import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IAttendence } from 'src/app/interfaces/IAttendence';
import { Pagination } from 'src/app/interfaces/IPagination';
import { UserParams } from 'src/app/models/UserParams';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
})
export class AttendanceReportComponent implements OnInit {

  pagination: Pagination | undefined;

  attendanceReport: IAttendence[] | undefined = [];

  userParams: UserParams | undefined;


  constructor(
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) {
    this.userParams = this.attendanceService.userParams;
  }

  ngOnInit() {
    this.getAttendanceReport();
  }

  getAttendanceReport() {
    if (this.userParams) {
      this.attendanceService.userParams = this.userParams;
      this.attendanceService.getAll(this.userParams).subscribe({
        next: (report) => {
          if (report) {
            this.attendanceReport = report.result;
            this.pagination = report.pagination;
          }
        },
        error: (error) => {
          this.attendanceReport = [];
          this.toastr.error(error.error);
        }
      });
    }
  }

  getFilteredDate() {
    if (this.userParams) {
      this.userParams.pageNumber = 1
      this.getAttendanceReport();
    }
  }

  deleteRecord(id: number): void {
    this.attendanceService.deleteRecord(id).subscribe(() => {
      this.toastr.success('Deleted Successfully');
    });
  }

  pageChanged(event: any) {
    if (this.userParams) {
      // we want to make sure that the page is already changed
      if (this.userParams.pageNumber !== event.page) {
        this.userParams.pageNumber = event.page;
        // then load the page with new pagination data
        this.getAttendanceReport();
      }
    }
  }

  resetFilters() {
    this.attendanceService.ResetUserParams();
  }

}
