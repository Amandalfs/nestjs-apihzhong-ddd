import { randomUUID } from 'crypto';
import { hashSync, compareSync } from 'bcrypt';

type Rules = 'member' | 'adminCustomer' | 'adminSuport' | 'adminWallet';

export class AuthUser {
  private _id: string;
  private _customer_id: string;
  private _email: string;
  private _password: string;
  private _rule: Rules = 'member';

  constructor(
    props: {
      customerId?: string;
      email: string;
      password: string;
      rule?: Rules;
      hash: boolean;
    },
    id?: string,
  ) {
    this._customer_id = props.customerId;
    this._email = props.email;
    if (props.hash) {
      this._password = props.password ? hashSync(props.password, 8) : '';
    } else {
      this._password = props.password ? props.password : '';
    }
    this._id = id ?? randomUUID();
    this._rule = props.rule ?? 'member';
    this.validate();
  }

  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }

  get customer_id(): string {
    return this._customer_id;
  }

  get rule(): string {
    return this._rule;
  }

  get password(): string {
    return this._password;
  }

  validate(): boolean {
    if (this._email.length === 0) {
      throw new Error('email is mandatory');
    }

    if (this._password.length === 0) {
      throw new Error('password is mandatory');
    }
    return true;
  }

  checkPassword(password: string): boolean {
    return compareSync(password, this._password) ? true : false;
  }
}
