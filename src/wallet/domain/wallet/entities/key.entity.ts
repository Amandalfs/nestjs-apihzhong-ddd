import { randomUUID } from 'crypto';

export type KeyType = 'email' | 'random' | 'cpf';

export class Key {
  private _keyEmail: string | null;
  private _keyRandom: string | null;
  private _keyCpf: string | null;

  constructor(
    props: Partial<{ keyEmail: string; keyRandom: string; keyCpf: string }>,
  ) {
    this._keyCpf = props.keyCpf ?? null;
    this._keyEmail = props.keyEmail ?? null;
    this._keyRandom = props.keyRandom ?? null;
  }

  addKeyEmail(email: string): void {
    this._keyEmail = email;
    if (this._keyEmail.length === 0) {
      throw new Error('param email is mandatory');
    }
  }

  deleteKeyEmail(): void {
    this._keyEmail = null;
  }

  addKeyCpf(cpf: string): void {
    this._keyCpf = cpf;
    if (this._keyCpf.length === 0) {
      throw new Error('param cpf is mandatory');
    }
  }

  deleteKeyCpf(): void {
    this._keyCpf = null;
  }

  generateKeyRandom(): void {
    this._keyRandom = randomUUID();
  }

  deleteKeyRandom(): void {
    this._keyRandom = null;
  }

  get keyEmail(): string {
    return this._keyEmail;
  }

  get keyCpf(): string {
    return this._keyCpf;
  }

  get keyRandom(): string {
    return this._keyRandom;
  }
}
