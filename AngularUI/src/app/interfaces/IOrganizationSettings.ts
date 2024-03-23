export interface IOrganizationSettings {
  commissionDTO: CommissionDTO;
  deductionDTO: DeductionDTO;
  weeklyDaysOffDTO: WeeklyDaysOffDTO;
}

interface CommissionDTO {
  type: number | null;
  hours?: number;
  amount?: number;
}

interface DeductionDTO {
  type: number | null;
  hours?: number;
  amount?: number;
}

interface WeeklyDaysOffDTO {
  days: number[];
}
