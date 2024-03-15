import { Component, OnInit } from '@angular/core';
import { DaysOffService } from 'src/app/services/days-off.service';

@Component({
  selector: 'app-offical-days',
  templateUrl: './offical-days.component.html',
  styleUrls: ['./offical-days.component.css']
})
export class OfficalDaysComponent implements OnInit{
  formData: any = {
    name: '',
    date: ''
  };
  daysOffList: any[] = [];
  constructor(private daysOffService:DaysOffService){}
  ngOnInit() {
    
    this.refreshDaysOffList();
  }
  onSubmit() {
    this.daysOffService.addDayOff(this.formData).subscribe(
      (response) => {
        console.log(' added successfully:', response);
        
        this.refreshDaysOffList();
      },
      (error) => {
        console.error('Error ', error);
      }
    );
  }
  deleteDayOff(dayOff: any) {
    
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
}}
