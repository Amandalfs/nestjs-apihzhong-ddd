import { Key } from './key.entity';

describe('key entinty tests units', () => {
  it('should create key by email', () => {
    const key = new Key({});
    key.addKeyEmail('email@email.com');

    expect(key.keyEmail).toEqual('email@email.com');
    expect(key.id).toBeDefined();
  });

  it('should be possible throw error with the mandatory email error.', () => {
    expect(() => {
      const key = new Key({});
      key.addKeyEmail('');
    }).toThrowError('param email is mandatory');
  });

  it('should create key by cpf', () => {
    const key = new Key({});
    key.addKeyCpf('123.456.789-11');

    expect(key.keyCpf).toEqual('123.456.789-11');
    expect(key.id).toBeDefined();
  });

  it('should be possible throw error with the mandatory cpf error.', () => {
    expect(() => {
      const key = new Key({});
      key.addKeyCpf('');
    }).toThrowError('param cpf is mandatory');
  });

  it('should create key by random', () => {
    const key = new Key({});
    key.generateKeyRandom();

    expect(key.keyRandom).toBeDefined();
    expect(key.keyRandom.length).toBeGreaterThan(1);
    expect(key.id).toBeDefined();
  });

  it('should delete key by email', () => {
    const key = new Key({});
    key.addKeyEmail('email@email.com');
    key.deleteKeyEmail();

    expect(key.keyEmail).toEqual(null);
    expect(key.id).toBeDefined();
  });

  it('should delete key by cpf', () => {
    const key = new Key({});
    key.addKeyCpf('123.456.789-11');
    key.deleteKeyCpf();

    expect(key.keyCpf).toEqual(null);
    expect(key.id).toBeDefined();
  });

  it('should delete key by random', () => {
    const key = new Key({});
    key.generateKeyRandom();
    key.deleteKeyRandom();

    expect(key.keyRandom).toEqual(null);
    expect(key.id).toBeDefined();
  });
});
