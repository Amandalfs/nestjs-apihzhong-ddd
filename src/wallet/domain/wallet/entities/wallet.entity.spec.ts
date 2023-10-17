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
});
