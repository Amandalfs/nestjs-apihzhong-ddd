export interface InputCreateAuthUserUseCaseDto {
  email: string;
  password: string;
  customerId: string;
}

export interface OutputCreateAuthUserUseCaseDto {
  id: string;
  email: string;
}
