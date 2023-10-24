interface OutputfindByIdDto {
  id: string;
  email: string;
  name: string;
  cpf: string;
}

export abstract class CustomerFacadeInterface {
  abstract findById(id: string): Promise<OutputfindByIdDto>;
}
