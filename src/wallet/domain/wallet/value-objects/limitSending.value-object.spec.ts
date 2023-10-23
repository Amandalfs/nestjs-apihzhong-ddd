import { LimitSending } from './limitSending.value-object';

describe('limit withdraw tests units', () => {
  it('should possible check limit', () => {
    const limitSendingByDaily = new LimitSending({
      limit: 300,
    });

    expect(limitSendingByDaily.checkLimit(200)).toEqual(true);
  });

  it('should throw an error if the limit is exceeded.', () => {
    const limitSendingByDaily = new LimitSending({
      limit: 300,
    });

    expect(() => {
      limitSendingByDaily.checkLimit(500);
    }).toThrowError('Impossible to sending this amount at once.');
  });
});
