import { Key } from './key.entity';

describe('key entinty tests units', () => {
  it('should create key by email', () => {
    const key = new Key({
      type: 'email',
      value: 'email@email.com',
    });

    expect(key.type).toEqual('email');
    expect(key.value).toEqual('email@email.com');
    expect(key.id).toBeDefined();
  });

  it('should be possible throw error with the mandatory number error.', () => {
    expect(() => {
      new Key({
        type: null,
        value: 'email@email.com',
      });
    }).toThrowError('type is mandatory');
  });
});
