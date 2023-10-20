export interface InputCreateCustomerDto {
  cpf: string;
  email: string;
  name: string;
  username: string;
  password: string;
}

export interface OutputCreateCustomerDto {
  id: string;
  cpf: string;
  email: string;
  name: string;
  username: string;
}
