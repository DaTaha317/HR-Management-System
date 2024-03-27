using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Constants;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.ProjectProcessing;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private IEmployeeRepo EmployeeRepo;
        private IAttendence AttendenceRepo;
        private ICommission CommissionRepo;
        private IDeduction DeductionRepo;
        public SalaryController(IEmployeeRepo EmployeeRepo, IAttendence AttendenceRepo, ICommission CommissionRepo, IDeduction DeductionRepo)
        {
            this.EmployeeRepo = EmployeeRepo;
            this.AttendenceRepo = AttendenceRepo;
            this.CommissionRepo = CommissionRepo;
            this.DeductionRepo = DeductionRepo;
        }
        [Authorize(Permissions.Salary.create)]
        [HttpPost]
        public ActionResult GetPayslip(SalaryReport salaryReport)
        {
            PayrollCalculator payroll = new PayrollCalculator(EmployeeRepo, AttendenceRepo, CommissionRepo, DeductionRepo);
            //payroll.SetPayrollData(salaryReport.EmpIds, salaryReport.PayslipStartDate, salaryReport.PayslipEndDate);
            payroll.SetPayrollData(salaryReport.PayslipStartDate, salaryReport.PayslipEndDate);
            List<Payslip> payslips = payroll.generatePayslips();

            return Ok(payslips);
        }
    }
}
