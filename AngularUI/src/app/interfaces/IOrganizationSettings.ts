export interface IOrganizationSettings {
  commissionDTO: CommissionDTO;
  deductionDTO: DeductionDTO;
  weeklyDaysDTO: weeklyDaysDTO;
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

interface weeklyDaysDTO {
  days: number[];
}
