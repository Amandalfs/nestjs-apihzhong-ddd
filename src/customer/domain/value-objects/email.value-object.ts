export class Email {
  private _email: string;

  constructor(email: string) {
    this._email = email;
    this.validate();
  }

  get email(): string {
    return this._email;
  }

  validate() {
    if (this._email.length === 0) {
      throw new Error('email is mandatory');
    }
    return true;
  }
}
