import { randomUUID } from 'crypto';

export class Extract {
  private _id: string;
  private _description: string;
  private _type: 'saque' | 'deposito' | 'enviado' | 'recebido';
  private _created_at: Date;
  private _value: number;
  private _wallet_id: string;

  constructor(
    props: {
      description: string;
      type: 'saque' | 'deposito' | 'enviado' | 'recebido';
      created_at: Date;
      value: number;
      wallet_id: string;
    },
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._wallet_id = props.wallet_id;
    this._description = props.description;
    this._created_at = props.created_at;
    this._type = props.type;
    this._value = props.value;
  }

  get id(): string {
    return this._id;
  }

  get description(): string {
    return this._description;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get type(): string {
    return this._type;
  }

  get value(): number {
    return this._value;
  }

  get wallet_id(): string {
    return this._wallet_id;
  }
}
