export class LimitWithdraw {
  private _limit: number;

  constructor(props: { limit: number }) {
    this._limit = props.limit;
  }

  checkLimit(balance: number): boolean {
    if (balance >= this._limit) {
      throw new Error('Impossible to withdraw this amount at once.');
    }
    return true;
  }

  get limit(): number {
    return this._limit;
  }
}
