import { MakeCpf } from '../factories/makeCpf';
import { Cpf } from '../value-objects/cpf.value-object';

describe('cpf value object tests units', () => {
  const cpfsInvalids = [
    '000.000.000-00',
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
    '444.444.444-44',
    '555.555.555-55',
    '666.666.666-66',
    '777.777.777-77',
    '888.888.888-88',
    '999.999.999-99',
    '123.456.789-09',
    '987.654.321-00',
    '123.123.123-12',
    '456.789.012-34',
    '000.111.222-33',
    '333.222.111-00',
    '555.555.555-55',
    '444.333.222-11',
    '123.456.789-90',
  ];

  it('should create cpf', () => {
    const cpf = new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 1]);
    expect(cpf.cpfFormatted).toEqual('123.456.789-11');
  });

  it('should throw an error if not provided with 9 numbers.', () => {
    expect(() => {
      new Cpf([1, 2, 3, 4, 5, 6], [1, 1]);
    }).toThrowError('mandatory to provide an array of 9 digits.');
  });

  it('should throw an error if the 2 check digits are not provided.', () => {
    expect(() => {
      new Cpf([1, 2, 3, 4, 5, 6, 7, 8, 9], [1]);
    }).toThrowError('mandatory to provide an array with the 2 check digits.');
  });

  it('should validator cpf', () => {
    const cpf = MakeCpf.transformCpfByObjectValue({ cpf: '160.416.880-37' });
    expect(cpf.validateCpf()).toBeTruthy();
  });

  it.each(cpfsInvalids)(
    'should return false if the CPF is invalid.',
    (cpfInvalid) => {
      const cpf = MakeCpf.transformCpfByObjectValue({ cpf: cpfInvalid });
      expect(() => cpf.validateCpf()).toThrowError('cpf invalid');
    },
  );
});
