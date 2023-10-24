import { AuthUser } from './authUser.entity';

describe('authUser entity tests units', () => {
  it('should create authUser', () => {
    const authUser = new AuthUser({
      email: 'test@test.com',
      customerId: '548vdsfbsbs',
      password: '12345678',
      hash: true,
    });
    expect(authUser.email).toEqual('test@test.com');
    expect(authUser.customer_id).toEqual('548vdsfbsbs');
    expect(authUser.id).toBeDefined();
    expect(authUser.rule).toEqual('member');
  });

  it('should be possible throw error with the mandatory email error.', () => {
    expect(() => {
      new AuthUser({
        email: '',
        customerId: '548vdsfbsbs',
        password: '12345678',
        hash: true,
      });
    }).toThrowError('email is mandatory');
  });

  it('should be possible throw error with the mandatory password error.', () => {
    expect(() => {
      new AuthUser({
        email: 'test@test.com',
        customerId: '548vdsfbsbs',
        password: '',
        hash: true,
      });
    }).toThrowError('password is mandatory');
  });

  it('should be possible to validate a password.', () => {
    const authUser = new AuthUser({
      email: 'test@test.com',
      customerId: '548vdsfbsbs',
      password: '12345678',
      hash: true,
    });
    expect(authUser.checkPassword('12345678')).toEqual(true);
  });
});
