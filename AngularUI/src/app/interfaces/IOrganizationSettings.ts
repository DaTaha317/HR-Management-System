export interface IOrganizationSettings {
  commissionDTO: CommissionDTO;
  deductionDTO: DeductionDTO;
  // weeklyDaysOffDTO: WeeklyDaysOffDTO
}

interface CommissionDTO {
  type: null;
  hours?: number;
  amount?: number;
}

interface DeductionDTO {
  type: null;
  hours?: number;
  amount?: number;
}


interface WeeklyDaysOffDTO {
  days: number[];
}
