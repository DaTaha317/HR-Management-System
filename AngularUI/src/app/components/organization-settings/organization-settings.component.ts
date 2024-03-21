import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    weeklyDaysOffDTO: {
      days: [],
    },
  };

  public daysOfWeek: { name: string; value: number }[] = [
    { name: 'Saturday', value: 0 },
    { name: 'Sunday', value: 1 },
    { name: 'Monday', value: 2 },
    { name: 'Tuesday', value: 3 },
    { name: 'Wednesday', value: 4 },
    { name: 'Thursday', value: 5 },
    { name: 'Friday', value: 6 },
  ];
  constructor(
    private organization: SettingsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

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

  onCheckboxChange(event: any, dayValue: number) {
    const checkbox = event.target;

    if (checkbox.checked) {
      if (this.settings.weeklyDaysOffDTO.days.length < 2) {
        this.settings.weeklyDaysOffDTO.days.push(dayValue);
      } else {
        checkbox.checked = false;
        this.toastr.error('You cannot select more than 2 days off');
      }
    } else {
      const index = this.settings.weeklyDaysOffDTO.days.indexOf(dayValue);
      if (index !== -1) {
        this.settings.weeklyDaysOffDTO.days.splice(index, 1);
      }
    }

    if (this.settings.weeklyDaysOffDTO.days.length === 0) {
      checkbox.checked = true;
      this.settings.weeklyDaysOffDTO.days.push(dayValue);
    }
  }
}
