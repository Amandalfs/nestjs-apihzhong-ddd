import { LimitWithdraw } from '../../value-objects/limitWithdraw.value-object';
import { GenerateLimitWithdraw } from './GenerateLimitWithdraw.interface';

export class BusinessGenerateLimitWithdraw implements GenerateLimitWithdraw {
  limit: number = 1500;
  next: GenerateLimitWithdraw;
  constructor(next?: GenerateLimitWithdraw) {
    this.next = next;
  }

  execute(typeAccont: string): LimitWithdraw {
    if (typeAccont === 'empresarial') {
      return new LimitWithdraw({
        limit: this.limit,
      });
    }
    if (!this.next) throw Error();
    return this.next.execute(typeAccont);
  }
}
