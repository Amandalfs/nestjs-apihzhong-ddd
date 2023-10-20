import { randomUUID } from 'crypto';
import { LimitWithdraw } from '../value-objects/limitWithdraw.value-object';
import { LimitWithdrawByDaily } from './../value-objects/limitWithdrawByDaily.object-value';
import { Key } from './key.entity';

export class Wallet {
  private _id: string;
  private _customer_id: string;
  private _agency: string;
  private _agency_id: string;
  private _typeAccount: 'poupanca' | 'corrente' | 'empresarial';
  private _keys: Key = new Key({});
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
      keys?: Key;
    },
    id?: string,
  ) {
    this._agency = props.agency;
    this._agency_id = props.agency_id;
    this._customer_id = props.customer_id;
    this._typeAccount = props.typeAccount;
    this._id = id ?? randomUUID();
    this._balance = props.balance ?? this._balance;
    this._keys = props.keys ?? new Key({});

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

  get id(): string {
    return this._id;
  }

  get balance(): number {
    return this._balance;
  }

  get agency(): string {
    return this._agency;
  }

  get typeAccount(): 'poupanca' | 'corrente' | 'empresarial' {
    return this._typeAccount;
  }

  get limitWithdraw(): number {
    return this._limitWithdraw.limit;
  }

  get limitWithdrawByDaily(): number {
    return this._limitWithdrawByDaily.limit;
  }

  get keys(): Key {
    return this._keys;
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
}
