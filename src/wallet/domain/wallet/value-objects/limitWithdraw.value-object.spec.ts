import { LimitWithdraw } from './limitWithdraw.value-object';

describe('limit withdraw tests units', () => {
  it('should possible check limit', () => {
    const limitWithdrawByDaily = new LimitWithdraw({
      limit: 300,
    });

    expect(limitWithdrawByDaily.checkLimit(200)).toEqual(true);
  });

  it('should throw an error if the limit is exceeded.', () => {
    const limitWithdrawByDaily = new LimitWithdraw({
      limit: 300,
    });

    expect(() => {
      limitWithdrawByDaily.checkLimit(500);
    }).toThrowError('Impossible to withdraw this amount at once.');
  });
});
