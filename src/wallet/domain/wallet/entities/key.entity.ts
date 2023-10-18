import { randomUUID } from 'crypto';

export type KeyType = 'email' | 'random' | 'cpf';

export class Key {
  private _id: string;
  private _value: string;
  private _type: KeyType;

  constructor(props: { value: string; type: KeyType }, id?: string) {
    this._id = id ?? randomUUID();
    this._type = props.type;
    this._value = props.value;
    this.validate();
  }

  validate(): boolean {
    if (this._type === null) {
      throw new Error('type is mandatory');
    }

    return true;
  }

  get id(): string {
    return this.id;
  }

  get type(): KeyType {
    return this._type;
  }

  get value(): string {
    return this._value;
  }
}
