export interface IRolePermission {
  roleId: string
  roleName: string
  roleClaims: RoleClaim[]
}

export interface RoleClaim {
  displayValue: string
  isSelected: boolean
}
