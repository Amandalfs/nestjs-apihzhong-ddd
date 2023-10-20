export interface InputCreateWalletUseCaseDto {
  agency: string;
  agency_id: string;
  typeAccount: 'poupanca' | 'corrente' | 'empresarial';
  customer_id: string;
}

export interface OutputCreateWalletUseCaseDto {
  id: string;
  balance: number;
  typeAccount: 'poupanca' | 'corrente' | 'empresarial';
}
