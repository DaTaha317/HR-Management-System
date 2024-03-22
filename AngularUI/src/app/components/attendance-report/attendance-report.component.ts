import { Component, OnInit,TemplateRef } from '@angular/core';
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
  modalRef?:BsModalRef;
  attendancedel:number=1;
  attendancedate:Date=new Date();
  pagination: Pagination | undefined;
  attendanceReport: IAttendence[] | undefined = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  constructor(
    private modalService: BsModalService,

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

  deleteRecord(id: number,date:Date): void {
    console.log(id)

    this.attendanceService.deleteRecord(id,date).subscribe(() => {
      this.toastr.success('Deleted Successfully');
      this.getAttendanceReport();
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
  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void> ,id:number,date:Date) {
    console.log(id)
    console.log(date)

this.attendancedate=date;
this.attendancedel=id;
    

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  DeleteAttendence(id:number,date:Date){
    

    this.attendancedel=id;
    this.attendancedate=date;
    


   this. deleteRecord(this.attendancedel,this.attendancedate);
   this.modalRef?.hide();
   this.getAttendanceReport();

  }

}
