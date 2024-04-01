export interface InputCreateAdminSupportSessionsUseCaseDto {
  email: string;
  password: string;
}

export interface OutputCreateAdminSupportSessionsUseCaseDto {
  token: string;
}
