import { randomUUID } from 'crypto';
import { LimitWithdraw } from '../value-objects/limitWithdraw.value-object';
import { LimitWithdrawByDaily } from './../value-objects/limitWithdrawByDaily.object-value';
import { Key } from './key.entity';
import { LimitSending } from '../value-objects/limitSending.value-object';
import { LimitSendingByDaily } from '../value-objects/limitSendingByDaily.object-value';
import { MakeGenerateLimitSendingDaily } from '../factories/MakeGenerateLImitSendingDaily';
import { MakeGenerateLimitSending } from '../factories/MakeGenerateLimitSending';
import { MakeGenerateLimitWithdraw } from '../factories/MakeGenerateLimitWithdraw';
import { MakeGenerateLimitWithdrawDaily } from '../factories/MakeGenerateLimitWithdrawDaily';

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

  private _limitSending: LimitSending;
  private _limitSendingByDaily: LimitSendingByDaily;

  constructor(
    props: {
      agency: string;
      agency_id: string;
      typeAccount: 'poupanca' | 'corrente' | 'empresarial';
      customer_id: string;
      balance?: number;
      limitWithdraw?: LimitWithdraw;
      limitWithdrawByDaily?: LimitWithdrawByDaily;
      limitSending?: LimitSending;
      limitSendingByDaily?: LimitSendingByDaily;
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

    const generateLimitSendingDaily = MakeGenerateLimitSendingDaily.execute();
    const generateLimitSending = MakeGenerateLimitSending.execute();
    const generateLimitWithdraw = MakeGenerateLimitWithdraw.execute();
    const generateLimitWithdrawByDaily =
      MakeGenerateLimitWithdrawDaily.execute();

    this._limitWithdrawByDaily = props.limitWithdrawByDaily
      ? props.limitWithdrawByDaily
      : generateLimitWithdrawByDaily.execute(this._typeAccount);
    this._limitWithdraw = props.limitWithdraw
      ? props.limitWithdraw
      : generateLimitWithdraw.execute(this._typeAccount);

    this._limitSending = props.limitSending
      ? props.limitSending
      : generateLimitSending.execute(this._typeAccount);
    this._limitSendingByDaily = props.limitSendingByDaily
      ? props.limitSendingByDaily
      : generateLimitSendingDaily.execute(this._typeAccount);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customer_id;
  }

  get balance(): number {
    return this._balance;
  }

  get agency(): string {
    return this._agency;
  }

  get agencyId(): string {
    return this._agency_id;
  }

  get typeAccount(): 'poupanca' | 'corrente' | 'empresarial' {
    return this._typeAccount;
  }

  get limitWithdraw(): LimitWithdraw {
    return this._limitWithdraw;
  }

  get limitWithdrawByDaily() {
    return this._limitWithdrawByDaily;
  }

  get limitSending(): LimitSending {
    return this._limitSending;
  }

  get limitSendingByDaily(): LimitSendingByDaily {
    return this._limitSendingByDaily;
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
