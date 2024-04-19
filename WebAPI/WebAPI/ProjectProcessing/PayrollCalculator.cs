using WebAPI.Constants;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.ProjectProcessing
{
    public class PayrollCalculator
    {
        const int TOTAL_WORKING_DAYS_PER_MONTH = 30;
        private int[] EmpIds;
        private DateOnly PayslipStartDate;
        private DateOnly PayslipEndDate;

        private IEmployeeRepo EmployeeRepo;
        private IAttendence AttendenceRepo;
        private ICommission CommissionRepo;
        private IDeduction DeductionRepo;

        private decimal BaseSalary { get; set; }
        private decimal SalaryPerDay { get; set; }
        private decimal SalaryPerHour { get; set; }
        private int WorkingHours { get; set; }
        private Employee currentEmployee;

        // payslip data
        private int AttendanceDays;
        private int OvertimeHours;
        private int AbsenceDays;
        private int LatenessHours;


        private decimal LatenessHoursPay;
        private decimal TotalDeductions;
        private decimal TotalAdditional;
        private decimal AbsenceDaysPay;
        private decimal OvertimePay;
        private decimal NetSalary;


        public PayrollCalculator(IEmployeeRepo EmployeeRepo, IAttendence AttendenceRepo, ICommission CommissionRepo, IDeduction DeductionRepo)
        {
            this.EmployeeRepo = EmployeeRepo;
            this.AttendenceRepo = AttendenceRepo;
            this.CommissionRepo = CommissionRepo;
            this.DeductionRepo = DeductionRepo;

        }


        // set employee and payslip required data
        //public void SetPayrollData(int[] EmpIds, DateOnly PayslipStartDate, DateOnly PayslipEndDate)
        public void SetPayrollData(DateOnly PayslipStartDate, DateOnly PayslipEndDate)
        {
            //this.EmpIds = EmpIds;
            this.PayslipStartDate = PayslipStartDate;
            this.PayslipEndDate = PayslipEndDate;
        }

        //public void GetEmployeeData(int EmpId)
        public void GetEmployeeData(Employee Emp)
        {
            // TODO: load employee from database
            //currentEmployee = EmployeeRepo.GetById(EmpId);
            currentEmployee = Emp;
            // TODO: GetEmployeeSalaryData
            BaseSalary = currentEmployee.BaseSalary;
            // TODO: calculate employee working hours
            WorkingHours = CalculateWorkingHours();
            // TODO: calculate employee salary per day
            SalaryPerDay = CalculateSalaryPerDay();
            // TODO: calculate employee salary per hour
            SalaryPerHour = CalculateSalaryPerHour();
            // TODO: calculate employee Attendance days
            AttendanceDays = CalculateAttendanceDays();
            // TODO: calculate employee Absence days
            AbsenceDays = CalculateAbsenceDays();
            // TODO: calculate overtime hours
            OvertimeHours = CalculateOvertimeHours();
            //TODO: calculate latetime hours
            LatenessHours = CalculateLatenessHours();
        }

        //// get employee salary data
        //public void GetEmployeeSalary()
        //{
        //    // TODO: get salary from employee repo
        //    // TODO: set base salary here
        //}

        private decimal CalculateSalaryPerDay() { return Math.Round(BaseSalary / TOTAL_WORKING_DAYS_PER_MONTH, 2); }

        private decimal CalculateSalaryPerHour() { return Math.Round(SalaryPerDay / WorkingHours, 2); }

        private int CalculateWorkingHours() { return (currentEmployee.Departure.Hour) - currentEmployee.Arrival.Hour; }

        private int CalculateAttendanceDays() { 
            //return AttendenceRepo.GetAttendenceByEmpId(currentEmployee.Id)
            //    .Where(att => att.Status == AttendenceStatus.Present)
            //    .ToList().Count;

            return AttendenceRepo.GetByPeriod(PayslipStartDate, PayslipEndDate)
                .Where(att => att.EmpId == currentEmployee.Id && att.Status == AttendenceStatus.Present)
                .ToList().Count;
        }

        private int CalculateAbsenceDays() {
            //return AttendenceRepo.GetAttendenceByEmpId(currentEmployee.Id)
            //    .Where(att => att.Status == AttendenceStatus.Absent)
            //    .ToList().Count;
            return AttendenceRepo.GetByPeriod(PayslipStartDate, PayslipEndDate)
                .Where(att => att.EmpId == currentEmployee.Id && att.Status == AttendenceStatus.Absent)
                .ToList().Count;
        }

        private int CalculateOvertimeHours() {
            List<int> overtime = new List<int>();

            //overtime = (List<int>)AttendenceRepo.GetAttendenceByEmpId(currentEmployee.Id)
            //    .Where(att => att.Status == AttendenceStatus.Present)
            //    .ToList().Select(att => att.OvertimeInHours);
            overtime = AttendenceRepo.GetByPeriod(PayslipStartDate, PayslipEndDate)
                .Where(att => att.EmpId == currentEmployee.Id && att.Status == AttendenceStatus.Present)
                .Select(att => att.OvertimeInHours ?? 0)
                .ToList();
            

            return overtime.Sum();
        }

        private int CalculateLatenessHours() {
            List<int> latetime = new List<int>();
            //latetime = (List<int>)AttendenceRepo.GetAttendenceByEmpId(currentEmployee.Id)
            //    .Where(att => att.Status == AttendenceStatus.Present)
            //    .ToList().Select(att => att.LatetimeInHours);
            latetime = AttendenceRepo.GetByPeriod(PayslipStartDate, PayslipEndDate)
              .Where(att => att.EmpId == currentEmployee.Id && att.Status == AttendenceStatus.Present)
              .Select(att => att.LatetimeInHours ?? 0)
              .ToList();
            return latetime.Sum();
        }


        public List<Payslip> generatePayslips()
        {
            List<Payslip> result = new List<Payslip>();
            List<Employee> employees = EmployeeRepo.GetAll();
            //for (int i = 0; i < EmpIds.Length; i++)
            foreach(var employee in employees)
            {
                // TODO: call this
                //GetEmployeeData(EmpIds[i]);
                GetEmployeeData(employee);
                if (currentEmployee == null)
                {
                    // TODO: raise employee exception here :)
                }
                // calculate employee salary
                
                // calculate deduction amount
                if(DeductionRepo.Get().type == Unit.Hour)
                {
                    int Hours = DeductionRepo.Get().Hours;
                    LatenessHoursPay = LatenessHours * Hours * SalaryPerHour;
                }
                else
                {
                    LatenessHoursPay = LatenessHours * DeductionRepo.Get().Amount;
                }
                AbsenceDaysPay = AbsenceDays * SalaryPerDay;
                TotalDeductions = LatenessHoursPay + AbsenceDaysPay;

                // total additional amount
                if (CommissionRepo.Get().type == Unit.Hour)
                {
                    int Hours = CommissionRepo.Get().Hours;
                    OvertimePay = OvertimeHours * Hours * SalaryPerHour;
                }
                else
                {
                    OvertimePay = OvertimeHours * CommissionRepo.Get().Amount;
                }
                //OvertimePay = OvertimeHours * SalaryPerHour;
                TotalAdditional = OvertimePay;

                // calculate net salary
                NetSalary = (BaseSalary + TotalAdditional) - TotalDeductions;

                if(NetSalary < (BaseSalary/3))
                    NetSalary = (BaseSalary/3);

                // TODO: Fill your class here with data needed.
                Payslip payslip = new Payslip()
                {
                    FullName = currentEmployee.FullName,
                    DepartmentName = currentEmployee.Department.Name,
                    BaseSalary = BaseSalary,
                    AttendanceDays = AttendanceDays,
                    AbsenceDays = AbsenceDays,
                    OvertimeHours = OvertimeHours,
                    LatenessHours = LatenessHours,
                    TotalAdditional = TotalAdditional,
                    TotalDeduction = TotalDeductions,
                    NetSalary = NetSalary
                };
                // TODO: result.add(payslip_record);
                result.Add(payslip);
            }

            return result;

        }


        //public decimal CalculateInHours(int Hours)
        //{
        //    decimal Money;
        //    Money = Hours * SalaryPerHour;
        //    return Money;
        //}


        //public decimal CalculateInAmount(decimal Amount)
        //{
        //    double ToHours = ConvertAmountToHours(Amount);
        //    decimal Money;
        //    Money = (decimal)ToHours * SalaryPerHour;
        //    return Money;
        //}


        //public decimal CalculateAbsentDays(int days)
        //{
        //    decimal TotalAbsentMoney;
        //    TotalAbsentMoney = SalaryPerDay * days;
        //    return TotalAbsentMoney;
        //}



    }
}