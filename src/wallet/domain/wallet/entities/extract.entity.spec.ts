import { Extract } from './extract.entity';

describe('extract entity tests units', () => {
  it('should create extract', () => {
    const extract = new Extract({
      description: 'Withdraw',
      type: 'saque',
      value: 50,
      created_at: new Date(),
      wallet_id: 'id',
    });
    expect(extract.value).toEqual(50);
    expect(extract.type).toEqual('saque');
    expect(extract.created_at).toBeDefined();
    expect(extract.id).toBeDefined();
  });
});
