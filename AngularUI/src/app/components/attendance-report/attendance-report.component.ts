import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserParams } from 'src/app/models/UserParams';
import { ToastrService } from 'ngx-toastr';
import { IAttendence } from 'src/app/interfaces/IAttendence';
import { Pagination } from 'src/app/interfaces/IPagination';
import { AttendanceService } from 'src/app/services/attendance.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css'],
})
export class AttendanceReportComponent implements OnInit {
  modalRef?: BsModalRef;
  attendancedel: number = 1;
  attendancedate: Date = new Date();
  pagination: Pagination | undefined;

  attendanceReport: IAttendence[] | undefined = [];

  userParams: UserParams | undefined;


  constructor(
    private modalService: BsModalService,

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

  deleteRecord(id: number, date: Date): void {
   

    this.attendanceService.deleteRecord(id, date).subscribe(() => {
      this.toastr.success('Deleted Successfully');
      this.getAttendanceReport();
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
  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void>, id: number, date: Date) {
    

    this.attendancedate = date;
    this.attendancedel = id;


    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  DeleteAttendence(id: number, date: Date) {


    this.attendancedel = id;
    this.attendancedate = date;



    this.deleteRecord(this.attendancedel, this.attendancedate);
    this.modalRef?.hide();
    this.getAttendanceReport();

  }

}
