import { IMonth } from 'src/app/interfaces/IMonth';

export class TimeUtility {
  //* From HTML time to C# timeOnly
  static formatTime(timeValue: string): string {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeValue.split(':');

    // Format the time in HH:mm:ss format
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }

  //* from JS Date to C# dateOnly
  static dateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  static today(): string {
    return this.dateOnly(new Date());
  }

  //* Function to format IMonth for salary report request
  static formatSalaryMonth(year: number, month: number): IMonth {
    // Month in JavaScript is 0-indexed (January is 0, February is 1, etc.)
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0); // Passing 0 as the day gets the last day of the previous month

    const salaryMonth: IMonth = {
      payslipStartDate: this.dateOnly(firstDay),
      payslipEndDate: this.dateOnly(lastDay),
    };
    return salaryMonth;
  }
}
