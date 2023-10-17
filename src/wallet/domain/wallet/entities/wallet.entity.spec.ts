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

  it('should possible deposit the money', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });

    wallet.deposit(500);
    wallet.withdraw(200);
    expect(wallet.balance).toEqual(300);
  });

  it('should throw an error if withdraw an invalid.', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });
    expect(() => {
      wallet.withdraw(-250);
    }).toThrowError('withdraw that is greater than 0.');
  });

  it('should throw an error if trying to withdraw an amount greater than the account.', () => {
    const wallet = new Wallet({
      agency: '001',
      agency_id: '001',
      typeAccount: 'poupanca',
      customer_id: 'id',
    });
    expect(() => {
      wallet.withdraw(350);
    }).toThrowError('insufficient balance for this withdrawal.');
  });
});
