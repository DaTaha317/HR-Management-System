import { Component, OnInit } from '@angular/core';
import { IOrganizationSettings } from 'src/app/interfaces/IOrganizationSettings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.css'],
})
export class OrganizationSettingsComponent implements OnInit {
  isComissionHours = true;
  isDeductionHours = true;
  settings: IOrganizationSettings = {
    commissionDTO: {
      type: 0,
      hours: undefined,
      amount: undefined,
    },
    deductionDTO: {
      type: 0,
      hours: undefined,
      amount: undefined,
    },
    // weeklyDaysOffDTO:{
    //   days: []
    // }
  };

  weekdays = [
    { label: 'Saturday', value: 0 },
    { label: 'Sunday', value: 1 },
    { label: 'Monday', value: 2 },
    { label: 'Tuesday', value: 3 },
    { label: 'Wednesday', value: 4 },
    { label: 'Thursday', value: 5 },
    { label: 'Friday', value: 6 },
  ];
  constructor(private organization: SettingsService) {}

  ngOnInit(): void {
    this.getSettings();
  }

  // isChecked(day: number): boolean {
  //   console.log(this.settings.weeklyDaysOffDTO.days.indexOf(day));
  //   return this.settings.weeklyDaysOffDTO.days.includes(day);
  // }

  getSettings() {
    this.organization.GetOrganization().subscribe(
      (data: IOrganizationSettings | undefined) => {
        if (data) {
          this.settings = data;
        }
        console.log(data);
      },
      (error) => {
        console.error('Error fetching organization settings:', error);
      }
    );
  }

  onSubmit(): void {
    this.organization
      .UpdateOrganization(this.settings as IOrganizationSettings)
      .subscribe(
        (response) => {
          console.log(' added successfully:', response);

          // this.getSettings();
        },
        (error) => {
          console.error('Error ', error);
        }
      );
  }

  onComissionTypeChange() {
    if (this.settings.commissionDTO.type == 0) {
      this.isComissionHours = true;
      this.settings.commissionDTO.amount = undefined;
    } else {
      this.isComissionHours = false;
      this.settings.commissionDTO.hours = undefined;
    }
  }

  onDeductionTypeChange() {
    if (this.settings.deductionDTO.type == 0) {
      this.isDeductionHours = true;
      this.settings.deductionDTO.amount = undefined;
    } else {
      this.isDeductionHours = false;
      this.settings.deductionDTO.hours = undefined;
    }
  }

  // toggleDay(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   const day = parseInt(target.value); // Parse the value to a number
  //   if (this.settings && this.settings.weeklyDaysOffDTO) {
  //     if (this.settings.weeklyDaysOffDTO.days) {
  //       this.settings.weeklyDaysOffDTO.days = [];
  //     }

  //     const index = this.settings.weeklyDaysOffDTO.days.indexOf(day);
  //     if (index !== -1) {
  //       this.settings.weeklyDaysOffDTO.days.splice(index, 1);
  //     } else {
  //       this.settings.weeklyDaysOffDTO.days.push(day);
  //     }
  //   }
  // }
}
