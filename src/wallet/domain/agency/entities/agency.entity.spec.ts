import { Agency } from './agency.entity';

describe('agency entity tests units', () => {
  it('should create agency', () => {
    const agency = new Agency({
      name: 'Agency 1',
      number: '001',
    });

    expect(agency.id).toBeDefined();
    expect(agency.name).toEqual('Agency 1');
    expect(agency.number).toEqual('001');
  });

  it('should be possible throw error with the mandatory name error.', () => {
    expect(() => {
      new Agency({
        name: '',
        number: '001',
      });
    }).toThrowError('name is mandatory');
  });

  it('should be possible throw error with the mandatory number error.', () => {
    expect(() => {
      new Agency({
        name: 'Agency 1',
        number: '',
      });
    }).toThrowError('number is mandatory');
  });
});
