import * as dayjs from 'dayjs';

export class LimitWithdrawByDaily {
  private _currentLimit: {
    value: number;
    date: Date | null;
  };
  private _limit: number;

  constructor(props: {
    currentLimit: {
      value: number;
      date: Date | null;
    };
    limit: number;
  }) {
    this._currentLimit = {
      date: props.currentLimit.date,
      value: props.currentLimit.value,
    };
    this._limit = props.limit;
  }

  checkLimit(balance: number) {
    if (this._currentLimit.date === null) {
      return true;
    }

    const distanceInDaysFromWithdraw = dayjs(new Date()).diff(
      this._currentLimit.date,
      'day',
      true,
    );

    if (distanceInDaysFromWithdraw <= 1) {
      const expensedBalance = balance + this._currentLimit.value;
      if (expensedBalance >= this._limit) {
        throw new Error('The daily withdrawal limit has been reached.');
      }
    }
    return true;
  }

  addWithdraw(withdraw: number) {
    this._currentLimit.value = this._currentLimit.value + withdraw;
    this._currentLimit.date = new Date();
  }

  clearCurrent() {
    this._currentLimit.value = 0;
    this._currentLimit.date = null;
  }

  get limit(): number {
    return this._limit;
  }
}
