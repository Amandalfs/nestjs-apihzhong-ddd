import { LimitSendingByDaily } from '../../value-objects/limitSendingByDaily.object-value';
import { GenerateLimitSendingByDaily } from './GenerateLimitSendingByDaily.interface';

export class SavingGenerateLimitSendingByDaily
  implements GenerateLimitSendingByDaily
{
  limit: number = 1500;
  next: GenerateLimitSendingByDaily;
  constructor(next?: GenerateLimitSendingByDaily) {
    this.next = next;
  }

  execute(typeAccont: string): LimitSendingByDaily {
    if (typeAccont === 'poupanca') {
      return new LimitSendingByDaily({
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
