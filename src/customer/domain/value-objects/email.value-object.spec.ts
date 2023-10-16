import { Email } from './email.value-object';

describe('email value object tests units', () => {
  it('should create email', () => {
    const emailValueObject = new Email('test@test.com');
    expect(emailValueObject.email).toEqual('test@test.com');
  });

  it('should be possible throw error with the mandatory email error.', () => {
    expect(() => {
      new Email('');
    }).toThrowError('email is mandatory');
  });
});
