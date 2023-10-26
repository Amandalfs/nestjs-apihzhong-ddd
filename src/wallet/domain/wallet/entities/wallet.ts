import { randomUUID } from 'crypto';
import { LimitWithdraw } from '../value-objects/limitWithdraw.value-object';
import { LimitWithdrawByDaily } from './../value-objects/limitWithdrawByDaily.object-value';
import { Key } from './key.entity';
import { LimitSending } from '../value-objects/limitSending.value-object';
import { LimitSendingByDaily } from '../value-objects/limitSendingByDaily.object-value';
import { MakeGenerateLimitSendingDaily } from '../factories/MakeGenerateLImitSendingDaily';

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

    if (!props.limitWithdraw) {
      this.generateLimitWithdraw();
    } else {
      this._limitWithdraw = props.limitWithdraw;
    }

    if (!props.limitWithdrawByDaily) {
      this.generateLimitWithdrawByDaily();
    } else {
      this._limitWithdrawByDaily = props.limitWithdrawByDaily;
    }

    if (!props.limitSending) {
      this.generateLimitSending();
    } else {
      this._limitSending = props.limitSending;
    }

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

  get typeAccount(): 'poupanca' | 'corrente' | 'empresarial' {
    return this._typeAccount;
  }

  get limitWithdraw(): LimitWithdraw {
    return this._limitWithdraw;
  }

  generateLimitWithdraw() {
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
        break;
      case 'empresarial':
        this._limitWithdraw = new LimitWithdraw({
          limit: 1500,
        });
        break;
      default:
        break;
    }
  }

  get limitWithdrawByDaily() {
    return this._limitWithdrawByDaily;
  }

  generateLimitWithdrawByDaily() {
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
        break;
      case 'empresarial':
        this._limitWithdrawByDaily = new LimitWithdrawByDaily({
          currentLimit: {
            value: 0,
            date: null,
          },
          limit: 6000,
        });
        break;
    }
  }

  get limitSending(): LimitSending {
    return this._limitSending;
  }

  generateLimitSending(): void {
    switch (this._typeAccount) {
      case 'poupanca':
        this._limitSending = new LimitSending({
          limit: 300,
        });
        break;
      case 'corrente':
        this._limitSending = new LimitSending({
          limit: 800,
        });
        break;
      case 'empresarial':
        this._limitSending = new LimitSending({
          limit: 1500,
        });
        break;
    }
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
