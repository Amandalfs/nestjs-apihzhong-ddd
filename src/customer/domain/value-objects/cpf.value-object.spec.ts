import { Cpf } from '../value-objects/cpf.value-object';

describe('cpf value object tests units', () => {
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
});
