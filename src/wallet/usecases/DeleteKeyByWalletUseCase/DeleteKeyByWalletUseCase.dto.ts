export interface InputDeleteKeyByWalletUseCaseDto {
  id: string;
  typeKey: string;
}

export interface OutputDeleteKeyByWalletUseCaseDto {
  keyEmail: string | null;
  keyCpf: string | null;
  keyRandom: string | null;
}
