import { RepositoryInterface } from './../../../../@shared/repositories/repository.interface';
import { Wallet } from '../entities/wallet';
export interface WalletRepositoryInterface extends RepositoryInterface<Wallet> {
  findByKey(key: string): Promise<Wallet>;
}
