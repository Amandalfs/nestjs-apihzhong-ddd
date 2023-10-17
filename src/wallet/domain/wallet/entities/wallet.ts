import { randomUUID } from 'crypto';
import { LimitWithdraw } from '../value-objects/limitWithdraw.value-object';
import { LimitWithdrawByDaily } from './../value-objects/limitWithdrawByDaily.object-value';

export class Wallet {
  private _id: string;
  private _customer_id: string;
  private _agency: string;
  private _agency_id: string;
  private _typeAccount: 'poupanca' | 'corrente' | 'empresarial';
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
    },
    id?: string,
  ) {
    this._agency = props.agency;
    this._agency_id = props.agency_id;
    this._customer_id = props.customer_id;
    this._typeAccount = props.typeAccount;
    this._id = id ?? randomUUID();
    this._balance = props.balance ?? this._balance;

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
}
