export interface AuthUserFacadeInterface {
  createUserAuth(input: {
    customerId: string;
    email: string;
    password: string;
  }): Promise<void>;
}
