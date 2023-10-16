export class Cpf {
  private _numbers: number[];
  private _checkDigits: number[];

  constructor(numbers: number[], checkDigits: number[]) {
    this._numbers = numbers;
    this._checkDigits = checkDigits;
    this.validate();
  }

  validate() {
    if (this._numbers.length !== 9) {
      throw new Error('mandatory to provide an array of 9 digits.');
    }

    if (this._checkDigits.length !== 2) {
      throw new Error('mandatory to provide an array with the 2 check digits.');
    }
    return true;
  }

  get cpfFormatted() {
    const numbersFormatted: string[] = [];
    for (let index = 0; index < 3; index++) {
      const start = index * 3;
      const end = (index + 1) * 3;
      const numbers = this._numbers.slice(start, end).join('');
      numbersFormatted.push(numbers);
    }
    const checkDigits = this._checkDigits.join('');
    return `${numbersFormatted[0]}.${numbersFormatted[1]}.${numbersFormatted[2]}-${checkDigits}`;
  }
}
