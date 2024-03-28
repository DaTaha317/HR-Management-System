import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { DaysOffService } from 'src/app/services/days-off.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offical-days',
  templateUrl: './offical-days.component.html',
  styleUrls: ['./offical-days.component.css'],
})
export class OfficalDaysComponent implements OnInit {
  modalRef?: BsModalRef; // this is a reference to bootstrap modal
  formDataAdd: any = {
    name: '',
    date: '',
  };
  formDataUpdate: any = {
    name: '',
    date: '',
  };
  daysOffList: any[] = [];
  validationHolidays:FormGroup;
  deletDay:Date=new Date('2000-01-01');

  selectedRowIndex: number = -1;
  isUpdateFormVisible: boolean = false;
  totalLength: any;
  page: number = 1;
  searchText: any;

  constructor(private daysOffService: DaysOffService,
    private formbuilder:FormBuilder,
    private modalService: BsModalService,
    ) {
      this.validationHolidays= formbuilder.group({
        name:["",Validators.required],
        date:["",Validators.required]
      })
    }
    get name(){
      return this.validationHolidays.get('name')
    }
    get date(){
      return this.validationHolidays.get('date')
    }

  ngOnInit() {
    this.resetvalidation()
    this.closeForm();
    this.refreshDaysOffList();
  }
  onUpdateSubmit() {
    this.daysOffService
      .updateDayOff(this.formDataUpdate)
      .subscribe((response) => {
        this.refreshDaysOffList();
        this.closeForm();
      });
    this.selectedRowIndex = -1;
    this.isUpdateFormVisible = false;
  }

  onAddSubmit() {
    this.daysOffService.addDayOff(this.formDataAdd).subscribe(
      (response) => {
        this.refreshDaysOffList();
        this.resetForm();
        this.resetvalidation();
      },
      (error) => {
        console.error('Error ', error);
      }
    );
  }


  deleteDayOff(dayOff: any) {
    const lastIndex = this.daysOffList.length - 1;

    this.daysOffService.deleteDayOff(dayOff).subscribe(
      (response) => {
        // Check if the deleted item is the last one
        if (this.daysOffList.length === 1) {
          // If it's the last item, clear the list
          this.daysOffList = [];
        } else {
          // If it's not the last item, refresh the list
          this.refreshDaysOffList();
        }
      },
      (error) => {
        console.error('Error ', error);
      }
    );
    this.decline();
  }
  resetvalidation(){
      this.validationHolidays.reset();
  }

  refreshDaysOffList() {
    this.daysOffService.getAllDaysOff()
      .pipe(
        catchError((error) => {
          console.error('Fetching Data Error');
          return throwError("error");
        })
      )
      .subscribe(
        (data) => {
          if (data !== null) {
            this.daysOffList = data;
          } else {
            this.daysOffList = []; // Set daysOffList to an empty array if data is null
          }
          
        }
      );
  }
 

  // Method to show the update form with data from the selected row
  showUpdateForm(item: any) {
    // this.selectedRowIndex = this.daysOffList.indexOf(item); // Set selectedRowIndex to the index of the selected row
    this.formDataUpdate = { ...item };
    const popupForm = document.getElementById('popupForm') as HTMLElement;
    popupForm.style.display = 'block'; // Show the popup form
  }

  closeForm() {
    const popupForm = document.getElementById('popupForm') as HTMLElement;
    popupForm.style.display = 'none'; // Hide the popup form
  }
  resetForm() {
    this.formDataAdd = { name: '', date: '' }; // Reset form data
  }
  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void>, date: Date) {
    this.deletDay = date;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }
}
