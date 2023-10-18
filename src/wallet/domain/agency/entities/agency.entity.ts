import { randomUUID } from 'crypto';

export class Agency {
  private _id: string;
  private _name: string;
  private _number: string;

  constructor(
    props: {
      name: string;
      number: string;
    },
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._name = props.name;
    this._number = props.number;
    this.validate();
  }

  validate(): boolean {
    if (this._name.length === 0) {
      throw new Error('name is mandatory');
    }

    if (this._number.length === 0) {
      throw new Error('number is mandatory');
    }
    return true;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get number(): string {
    return this._number;
  }
}
