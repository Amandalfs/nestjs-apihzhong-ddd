export interface InputWithdrawBalanceUseCaseDto {
  id: string;
  withdrawValue: number;
}

export interface OutputWithdrawBalanceUseCaseDto {
  type: string;
  created_at: Date;
  description: string;
  value: number;
}
