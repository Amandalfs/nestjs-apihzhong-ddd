import { LimitWithdrawByDaily } from '../../value-objects/limitWithdrawByDaily.object-value';
import { GenerateLimitWithdrawByDaily } from './GenerateLimitWithdrawByDaily.interface';

export class SavingGenerateLimitWithdrawByDaily
  implements GenerateLimitWithdrawByDaily
{
  limit: number = 1500;
  next: GenerateLimitWithdrawByDaily;
  constructor(next?: GenerateLimitWithdrawByDaily) {
    this.next = next;
  }

  execute(typeAccont: string): LimitWithdrawByDaily {
    if (typeAccont === 'poupanca') {
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
