import { randomUUID } from 'crypto';
import { Cpf } from '../value-objects/cpf.value-object';
import { Email } from '../value-objects/email.value-object';

export class Customer {
  private _id: string;
  private _name: string;
  private _username: string;
  private _active: boolean = false;
  private _cpf: Cpf | null;
  private _email: Email;

  constructor(
    props: {
      name: string;
      username: string;
      cpf: Cpf;
      email: Email;
      active?: boolean;
    },
    id?: string,
  ) {
    this._name = props.name;
    this._username = props.username;
    this._cpf = props.cpf;
    this._email = props.email;
    this._id = id ?? randomUUID();
    this.validate();
  }

  validate(): boolean {
    if (this._name.length === 0) {
      throw new Error('name is mandatory');
    }

    if (this._username.length === 0) {
      throw new Error('username is mandatory');
    }
    if (this._cpf === null) {
      throw new Error('cpf is mandatory');
    }
    return true;
  }

  get name(): string {
    return this._name;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email.email;
  }

  get id(): string {
    return this._id;
  }

  isActive(): boolean {
    return this._active;
  }

  get cpf(): Cpf {
    return this._cpf;
  }

  changeEmail(email: Email): void {
    this._email = email;
    this.validate();
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeUsername(username: string): void {
    this._username = username;
    this.validate();
  }

  activate(): void {
    this._active = true;
    this.validate();
  }
}
