

import { Component, OnInit } from '@angular/core';
import { DaysOffService } from 'src/app/services/days-off.service';

@Component({
  selector: 'app-offical-days',
  templateUrl: './offical-days.component.html',
  styleUrls: ['./offical-days.component.css']
})
export class OfficalDaysComponent implements OnInit {
  formDataAdd: any = {
    name: '',
    date: ''
  };
  formDataUpdate: any = {
    name: '',
    date: ''
  };
  daysOffList: any[] = [];
  selectedRowIndex: number = -1;
  isUpdateFormVisible: boolean = false;

  constructor(private daysOffService: DaysOffService) {}

  ngOnInit() {
    this.refreshDaysOffList();
  }
  onUpdateSubmit(){
    this.daysOffService.updateDayOff(this.formDataUpdate).subscribe(
      (response) => {
        console.log('Updated successfully:', response);
        this.refreshDaysOffList();
        this.closeForm(); 
      })
      this.selectedRowIndex = -1; 
      this.isUpdateFormVisible = false; 
  }

  onAddSubmit() {
   
      
      this.daysOffService.addDayOff(this.formDataAdd).subscribe(
        (response) => {
          console.log('Added successfully:', response);
          this.refreshDaysOffList();
          this.resetForm();
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
        console.log('Deleted successfully:', response);
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
  }

  refreshDaysOffList() {
    this.daysOffService.getAllDaysOff().subscribe(
      (data) => {
        this.daysOffList = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Method to show the update form with data from the selected row
  showUpdateForm(item: any) {
    console.log(item)
    // this.selectedRowIndex = this.daysOffList.indexOf(item); // Set selectedRowIndex to the index of the selected row
     this.formDataUpdate = { ...item }; 
     console.log(this.formDataUpdate)
    const popupForm = document.getElementById("popupForm") as HTMLElement;
     popupForm.style.display = "block"; // Show the popup form
  }

  closeForm() {
    const popupForm = document.getElementById("popupForm") as HTMLElement;
    popupForm.style.display = "none"; // Hide the popup form
  }
  resetForm() {
    this.formDataAdd = { name: '', date: '' }; // Reset form data
  }
}

