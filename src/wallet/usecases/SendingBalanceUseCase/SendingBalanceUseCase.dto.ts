export interface InputSendingBalanceUseCaseDto {
  id: string;
  key: string;
  sendingValue: number;
}

export interface OutputSendingBalanceUseCaseDto {
  type: string;
  created_at: Date;
  description: string;
  value: number;
}
