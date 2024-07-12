export interface InputCreateCustomerSessionsUseCaseDto {
  email: string;
  password: string;
}

export interface OutputCreateCustomerSessionsUseCaseDto {
  token: string;
}
