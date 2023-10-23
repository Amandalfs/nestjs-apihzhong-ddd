export interface InputCreateKeyByWalletUseCaseDto {
  id: string;
  typeKey: string;
}

export interface OutputCreateKeyByWalletUseCaseDto {
  keyEmail: string;
  keyCpf: string;
  keyRandom: string;
}
