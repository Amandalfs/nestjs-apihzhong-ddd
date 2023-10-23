import { LimitSendingByDaily } from './limitSendingByDaily.object-value';

describe('limit withdraw by daily tests units', () => {
  it('should possible check limit', () => {
    const limitSendingByDaily = new LimitSendingByDaily({
      currentLimit: {
        date: null,
        value: 0,
      },
      limit: 300,
    });

    expect(limitSendingByDaily.checkLimit(200)).toEqual(true);
  });

  it('should throw an error if the limit is exceeded.', () => {
    const limitSendingDaily = new LimitSendingByDaily({
      currentLimit: {
        date: null,
        value: 0,
      },
      limit: 300,
    });
    limitSendingDaily.addSending(200);

    expect(() => {
      limitSendingDaily.checkLimit(500);
    }).toThrowError('The daily sending limit has been reached.');
  });
});
