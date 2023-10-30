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

  validateCpf() {
    if (this.isEqualNumbers(this._numbers[0])) {
      throw new Error('cpf invalid');
    }

    const primaryDigitTotal = this.calculatePrimaryDigit();
    const primaryDigit = this.verificationDigit(primaryDigitTotal);
    const secondaryDigitTotal = this.calculateSecondaryDigit(primaryDigit);
    const secondaryDigit = this.verificationDigit(secondaryDigitTotal);
    const isValidCpf =
      primaryDigit === this._checkDigits[0] &&
      secondaryDigit === this._checkDigits[1];
    if (!isValidCpf) {
      throw new Error('cpf invalid');
    }

    return true;
  }

  calculatePrimaryDigit() {
    let numberMultiplier = 10;
    const maxNumberMultiplier = 2;
    const primaryDigitVerificationTotal = this._numbers.reduce(
      (accumulation, number) => {
        if (numberMultiplier >= maxNumberMultiplier) {
          accumulation += number * numberMultiplier--;
        }
        return accumulation;
      },
      0,
    );

    return primaryDigitVerificationTotal;
  }

  calculateSecondaryDigit(primary: number) {
    let numberMultiplier = 11;
    const maxNumberMultiplier = 2;
    const numbersWithPrimaryDigit = this._numbers;
    numbersWithPrimaryDigit.push(primary);

    const secondaryDigitVerificationTotal = this._numbers.reduce(
      (accumulator, number) => {
        if (numberMultiplier >= maxNumberMultiplier) {
          accumulator += number * numberMultiplier--;
        }
        return accumulator;
      },
      0,
    );
    return secondaryDigitVerificationTotal;
  }

  verificationDigit(accumalator: number): number {
    const remainderOfDivision = accumalator % 11;
    const isTenOrEleven =
      remainderOfDivision === 10 || remainderOfDivision === 11;
    return isTenOrEleven ? 0 : 11 - remainderOfDivision;
  }

  isEqualNumbers(numberValidator: number): boolean {
    const numbersEquals =
      this._checkDigits.every((number) => number === numberValidator) &&
      this._numbers.every((number) => number === numberValidator);
    return numbersEquals;
  }
}
