import { Component, OnInit } from '@angular/core';
import { IMonth } from 'src/app/interfaces/IMonth';
import { IPaySlip } from 'src/app/interfaces/IPaySlip';
import { SalaryService } from 'src/app/services/salary.service';
import { TimeUtility } from 'src/environments/TimeUtility';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css'],
})
export class SalaryReportComponent implements OnInit {
  salaryReport: IPaySlip[] = [];
  year: any;
  month: any;
  totalLength: any;
  page: number = 1;
  searchText: any;
  years: number[] = [];
  months: { value: number; name: string }[];
  constructor(private salaryService: SalaryService) {
    this.months = [
      { value: 1, name: 'January' },
      { value: 2, name: 'February' },
      { value: 3, name: 'March' },
      { value: 4, name: 'April' },
      { value: 5, name: 'May' },
      { value: 6, name: 'June' },
      { value: 7, name: 'July' },
      { value: 8, name: 'August' },
      { value: 9, name: 'September' },
      { value: 10, name: 'October' },
      { value: 11, name: 'November' },
      { value: 12, name: 'December' },
    ];
  }

  ngOnInit() {
    this.getYears();
  }

  getSalaryReport(month: IMonth) {
    this.salaryService.getSalaryReport(month).subscribe((data) => {
      this.salaryReport = data;
    });
  }

  onSearch() {
    const salaryMonth: IMonth = TimeUtility.formatSalaryMonth(
      this.year,
      this.month
    );
    this.getSalaryReport(salaryMonth);
  }

  isSalaryMonth(): boolean {
    return !this.month || !this.year;
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    for (let year = 2008; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
}
