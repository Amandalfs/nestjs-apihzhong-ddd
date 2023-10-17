import { Wallet } from './wallet';

describe('wallet tests units', () => {
  it('should create wallet', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });

    expect(wallet.balance).toEqual(0);
    expect(wallet.agency).toEqual('001');
    expect(wallet.typeAccount).toEqual('poupanca');
  });

  it('should possible generate limits at account', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });

    expect(wallet.limitWithdraw).toEqual(300);
    expect(wallet.limitWithdrawByDaily).toEqual(1500);
  });

  it('should possible deposit the money', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });

    wallet.deposit(250);
    expect(wallet.balance).toEqual(250);
  });

  it('should throw an error if sending an invalid deposit.', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });
    expect(() => {
      wallet.deposit(-250);
    }).toThrowError('deposit that is greater than 0.');
  });
});
