import { LimitWithdraw } from '../../value-objects/limitWithdraw.value-object';
import { GenerateLimitWithdraw } from './GenerateLimitWithdraw.interface';

export class ChainGenerateLimitWithdraw implements GenerateLimitWithdraw {
  limit: number = 800;
  next: GenerateLimitWithdraw;
  constructor(next?: GenerateLimitWithdraw) {
    this.next = next;
  }

  execute(typeAccont: string): LimitWithdraw {
    if (typeAccont === 'corrente') {
      return new LimitWithdraw({
        limit: this.limit,
      });
    }
    if (!this.next) throw Error();
    return this.next.execute(typeAccont);
  }
}
