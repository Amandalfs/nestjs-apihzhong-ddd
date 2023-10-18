import { randomUUID } from 'crypto';
import { LimitWithdraw } from '../value-objects/limitWithdraw.value-object';
import { LimitWithdrawByDaily } from './../value-objects/limitWithdrawByDaily.object-value';
import { Key, KeyType } from './key.entity';

export class Wallet {
  private _id: string;
  private _customer_id: string;
  private _agency: string;
  private _agency_id: string;
  private _typeAccount: 'poupanca' | 'corrente' | 'empresarial';
  private _keys: Key[] = [];
  private _balance: number = 0;

  private _limitWithdraw: LimitWithdraw;
  private _limitWithdrawByDaily: LimitWithdrawByDaily;

  constructor(
    props: {
      agency: string;
      agency_id: string;
      typeAccount: 'poupanca' | 'corrente' | 'empresarial';
      customer_id: string;
      balance?: number;
      limitWithdraw?: LimitWithdraw;
      limitWithdrawByDaily?: LimitWithdrawByDaily;
      keys?: Key[];
    },
    id?: string,
  ) {
    this._agency = props.agency;
    this._agency_id = props.agency_id;
    this._customer_id = props.customer_id;
    this._typeAccount = props.typeAccount;
    this._id = id ?? randomUUID();
    this._balance = props.balance ?? this._balance;
    this._keys = props.keys ?? [];

    if (!props.limitWithdraw) {
      switch (this._typeAccount) {
        case 'poupanca':
          this._limitWithdraw = new LimitWithdraw({
            limit: 300,
          });
          break;
        case 'corrente':
          this._limitWithdraw = new LimitWithdraw({
            limit: 800,
          });
        case 'empresarial':
          this._limitWithdraw = new LimitWithdraw({
            limit: 1500,
          });
        default:
          break;
      }
    } else {
      this._limitWithdraw = props.limitWithdraw;
    }

    if (!props.limitWithdrawByDaily) {
      switch (this._typeAccount) {
        case 'poupanca':
          this._limitWithdrawByDaily = new LimitWithdrawByDaily({
            currentLimit: {
              value: 0,
              date: null,
            },
            limit: 1500,
          });
          break;
        case 'corrente':
          this._limitWithdrawByDaily = new LimitWithdrawByDaily({
            currentLimit: {
              value: 0,
              date: null,
            },
            limit: 4000,
          });
        case 'empresarial':
          this._limitWithdrawByDaily = new LimitWithdrawByDaily({
            currentLimit: {
              value: 0,
              date: null,
            },
            limit: 6000,
          });
        default:
          break;
      }
    } else {
      this._limitWithdrawByDaily = props.limitWithdrawByDaily;
    }
  }

  get balance(): number {
    return this._balance;
  }

  get agency(): string {
    return this._agency;
  }

  get typeAccount(): string {
    return this._typeAccount;
  }

  get limitWithdraw(): number {
    return this._limitWithdraw.limit;
  }

  get limitWithdrawByDaily(): number {
    return this._limitWithdrawByDaily.limit;
  }

  deposit(deposit: number) {
    if (deposit <= 0 || isNaN(Number(deposit))) {
      throw new Error('deposit that is greater than 0.');
    }
    this._balance += deposit;
  }

  withdraw(withdraw: number) {
    if (withdraw <= 0 || isNaN(Number(withdraw))) {
      throw new Error('withdraw that is greater than 0.');
    }
    if (withdraw > this.balance) {
      throw new Error('insufficient balance for this withdrawal.');
    }
    this._balance -= withdraw;
  }

  addKey(props: { value?: string; type: KeyType }) {
    if (props.type === 'email') {
      const alreadyExistKey = this._keys.find((key) => {
        return key.type === 'email';
      });

      if (alreadyExistKey) {
        throw new Error('There is already a key with the email type.');
      }
      return this._keys.push(
        new Key({
          value: props.value,
          type: 'email',
        }),
      );
    }

    if (props.type === 'cpf') {
      const alreadyExistKey = this._keys.find((key) => {
        return key.type === 'cpf';
      });

      if (alreadyExistKey) {
        throw new Error('There is already a key with the cpf type.');
      }

      return this._keys.push(
        new Key({
          value: props.value,
          type: 'email',
        }),
      );
    }

    if (props.type === 'random') {
      const keyValue = randomUUID();
      return this._keys.push(
        new Key({
          value: keyValue,
          type: 'email',
        }),
      );
    }
  }
}
