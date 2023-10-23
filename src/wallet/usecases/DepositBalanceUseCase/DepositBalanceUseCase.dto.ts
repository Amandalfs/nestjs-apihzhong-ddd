export interface InputDepositBalanceUseCaseDto {
  id: string;
  depositValue: number;
}

export interface OutputDepositBalanceUseCaseDto {
  type: string;
  created_at: Date;
  description: string;
  value: number;
}
