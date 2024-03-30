export interface IRole {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp?: string;
}

export interface IRoleName {
  name: string;
}
