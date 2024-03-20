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
  constructor(private salaryService: SalaryService) {}

  ngOnInit() {}

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
}
