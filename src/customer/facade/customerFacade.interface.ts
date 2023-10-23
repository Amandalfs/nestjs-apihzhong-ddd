interface OutputfindByIdDto {
  id: string;
  email: string;
  name: string;
  cpf: string;
}

export interface CustomerFacadeInterface {
  findById(id: string): Promise<OutputfindByIdDto>;
}
