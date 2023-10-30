import { Cpf } from '../value-objects/cpf.value-object';

interface InputTransformCpfByObjectValue {
  cpf: string;
}

export class MakeCpf {
  static transformCpfByObjectValue({ cpf }: InputTransformCpfByObjectValue) {
    const cpfNumbers = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .slice(0, 9)
      .split('')
      .map((number) => {
        return Number(number);
      });

    const cpfCheckDigits = cpf
      .replaceAll('.', '')
      .replaceAll('-', '')
      .slice(9, 11)
      .split('')
      .map((digit) => {
        return Number(digit);
      });

    return new Cpf(cpfNumbers, cpfCheckDigits);
  }
}
