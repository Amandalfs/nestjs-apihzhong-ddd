import { LimitWithdrawByDaily } from './limitWithdrawByDaily.object-value';

describe('limit withdraw by daily tests units', () => {
  it('should possible check limit', () => {
    const limitWithdrawByDaily = new LimitWithdrawByDaily({
      currentLimit: {
        date: null,
        value: 0,
      },
      limit: 300,
    });

    expect(limitWithdrawByDaily.checkLimit(200)).toEqual(true);
  });

  it('should throw an error if the limit is exceeded.', () => {
    const limitWithdrawByDaily = new LimitWithdrawByDaily({
      currentLimit: {
        date: null,
        value: 0,
      },
      limit: 300,
    });
    limitWithdrawByDaily.addWithdraw(200);

    expect(() => {
      limitWithdrawByDaily.checkLimit(500);
    }).toThrowError('The daily withdrawal limit has been reached.');
  });
});
