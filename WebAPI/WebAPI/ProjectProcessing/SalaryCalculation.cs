namespace WebAPI.ProjectProcessing
{
    public class SalaryCalculation
    {
        public decimal MoneyPerDay { get; set; }
        public decimal MoneyPerHour { get; set; }

        public void CalculateMoneyPerDay(int workingHours, decimal salary)
        {
            int DaysPerMonth = 30;
            MoneyPerDay = salary / DaysPerMonth;
            CalculateMoneyPerHour(workingHours, MoneyPerDay);
        }

        public void CalculateMoneyPerHour(int workingHours, decimal moneyPerDay)
        {
            MoneyPerHour = moneyPerDay / workingHours;
        }

        public double ConvertAmountToHours(decimal money)
        {
            return (double)(money / MoneyPerHour);
        }

        public decimal CalculateInHours(int Hours)
        {
            decimal Money;
            Money = Hours * MoneyPerHour;
            return Money;
        }

        public decimal CalculateInAmount(decimal Amount)
        {
            double ToHours = ConvertAmountToHours(Amount);
            decimal Money;
            Money = (decimal)ToHours * MoneyPerHour;
            return Money;
        }

        public decimal CalculateAbsentDays(int days)
        {
            decimal TotalAbsentMoney;
            TotalAbsentMoney = MoneyPerDay * days;
            return TotalAbsentMoney;
        }

    }
}
