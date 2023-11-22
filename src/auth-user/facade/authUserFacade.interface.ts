export abstract class AuthUserFacadeInterface {
  abstract createUserAuth(input: {
    customerId: string;
    email: string;
    password: string;
  }): Promise<void>;
}
