export interface IOrganizationSettings {
    commissionDTO : CommissionDTO;
    deductionDTO : DeductionDTO;
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