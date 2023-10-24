import { RepositoryInterface } from './../../../../@shared/repositories/repository.interface';
import { Wallet } from '../entities/wallet';
export abstract class WalletRepositoryInterface extends RepositoryInterface<Wallet> {
  abstract findByKey(key: string): Promise<Wallet>;
}
