import { LimitWithdrawByDaily } from '../../value-objects/limitWithdrawByDaily.object-value';
import { GenerateLimitWithdrawByDaily } from './GenerateLimitWithdrawByDaily.interface';

export class ChainGenerateLimitWithdrawByDaily
  implements GenerateLimitWithdrawByDaily
{
  limit: number = 4000;
  next: GenerateLimitWithdrawByDaily;
  constructor(next?: GenerateLimitWithdrawByDaily) {
    this.next = next;
  }

  execute(typeAccont: string): LimitWithdrawByDaily {
    if (typeAccont === 'corrente') {
      return new LimitWithdrawByDaily({
        limit: this.limit,
        currentLimit: {
          value: 0,
          date: null,
        },
      });
    }
    if (!this.next) throw Error();
    return this.next.execute(typeAccont);
  }
}
