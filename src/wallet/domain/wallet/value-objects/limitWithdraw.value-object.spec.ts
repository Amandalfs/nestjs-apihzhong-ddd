import { LimitWithdraw } from './limitWithdraw.value-object';

describe('limit withdraw tests units', () => {
  it('should possible check limit', () => {
    const limitWithdraw = new LimitWithdraw({
      limit: 300,
    });

    expect(limitWithdraw.checkLimit(200)).toEqual(true);
  });

  it('should throw an error if the limit is exceeded.', () => {
    const limitWithdraw = new LimitWithdraw({
      limit: 300,
    });

    expect(() => {
      limitWithdraw.checkLimit(500);
    }).toThrowError('Impossible to withdraw this amount at once.');
  });
});
