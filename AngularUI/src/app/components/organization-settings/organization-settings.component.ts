import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOrganizationSettings } from 'src/app/interfaces/IOrganizationSettings';
import { SettingsService } from 'src/app/services/settings.service';
import { __values } from 'tslib';


@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.css'],
})
export class OrganizationSettingsComponent implements OnInit {
  
  validationSetting:FormGroup;
  isComissionHours = true;
  isDeductionHours = true;
  public settings: IOrganizationSettings = {
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
    weeklyDaysDTO: {
      days: [],
    },
  };

  public daysOfWeek: { name: string; value: number; state: boolean }[] = [
    { name: 'Saturday', value: 6, state: false },
    { name: 'Sunday', value: 0, state: false },
    { name: 'Monday', value: 1, state: false },
    { name: 'Tuesday', value: 2, state: false },
    { name: 'Wednesday', value: 3, state: false },
    { name: 'Thursday', value: 4, state: false },
    { name: 'Friday', value: 5, state: false },
  ];
  constructor(
    private organization: SettingsService,
    private toastr: ToastrService,
    formbuilder:FormBuilder
  ) {
    this.validationSetting=formbuilder.group({
      "commission":["",[Validators.required, Validators.pattern('[0-9]*'),this.nonNegativeValidator]],
      "deduction":["",[Validators.required, Validators.pattern('[0-9]*'),this.nonNegativeValidator]],


    })
  }
  nonNegativeValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (value < 0) {
      return { negative: true };
    }
    return null;
  }
  
 
  get commission(){
    return this.validationSetting.get("commission")
  }
  get deduction(){
    return this.validationSetting.get("deduction")
  }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.organization.GetOrganization().subscribe(
      (data: IOrganizationSettings) => {
        if (data) {
          this.settings = data;
          if (this.settings.commissionDTO.type == 1) {
            this.isComissionHours = false;
          }
          if (this.settings.deductionDTO.type == 1) {
            this.isDeductionHours = false;
          }
        }
        this.updateStateBasedOnNumbers(data.weeklyDaysDTO.days);
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
          this.toastr.success('Successfully Updated');

          this.getSettings();
        },
        (error) => {
          console.error('Error ', error);
        }
      );
  }

  onComissionTypeChange() {
    if (this.settings.commissionDTO.type == 0) {
      this.isComissionHours = true;
      this.settings.commissionDTO.hours = undefined;
    } else {
      this.isComissionHours = false;
      this.settings.commissionDTO.amount = undefined;
    }
  }

  onDeductionTypeChange() {
    if (this.settings.deductionDTO.type == 0) {
      this.isDeductionHours = true;
      this.settings.deductionDTO.hours = undefined;
    } else {
      this.isDeductionHours = false;
      this.settings.deductionDTO.amount = undefined;
    }
  }

  onCheckboxChange(event: any, dayValue: number) {
    const checkbox = event.target;

    // Ensure that weeklyDaysDTO is defined and has the 'days' property
    if (this.settings.weeklyDaysDTO && this.settings.weeklyDaysDTO.days) {
      if (checkbox.checked) {
        // Check if days array has been initialized
        if (!Array.isArray(this.settings.weeklyDaysDTO.days)) {
          this.settings.weeklyDaysDTO.days = [];
        }
        // Check if there are less than 2 days selected
        if (this.settings.weeklyDaysDTO.days.length < 2) {
          this.settings.weeklyDaysDTO.days.push(dayValue);
        } else {
          checkbox.checked = false;
          this.toastr.error('You cannot select more than 2 days off');
        }
      } else {
        // Remove the day from the array if unchecked
        const index = this.settings.weeklyDaysDTO.days.indexOf(dayValue);
        if (index !== -1) {
          this.settings.weeklyDaysDTO.days.splice(index, 1);
        }
      }
    } else {
      // If weeklyDaysDTO or days property is not available, initialize them
      this.settings.weeklyDaysDTO = { days: [] };
      this.settings.weeklyDaysDTO.days.push(dayValue);
    }
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  public getActiveDays(): number[] {
    return this.daysOfWeek.reduce((activeDays: number[], day) => {
      if (day.state) {
        activeDays.push(day.value);
      }
      return activeDays;
    }, []);
  }

  public updateStateBasedOnNumbers(numbers: number[]): void {
    this.daysOfWeek.forEach((day) => {
      if (numbers.includes(day.value)) {
        day.state = true;
      } else {
        day.state = false;
      }
    });
  }
}
