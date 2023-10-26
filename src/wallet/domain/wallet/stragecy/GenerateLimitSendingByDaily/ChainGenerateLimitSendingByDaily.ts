import { LimitSendingByDaily } from '../../value-objects/limitSendingByDaily.object-value';
import { GenerateLimitSendingByDaily } from './GenerateLimitSendingByDaily.interface';

export class ChainGenerateLimitSendingByDaily
  implements GenerateLimitSendingByDaily
{
  private limit: number = 4000;

  constructor(private next?: GenerateLimitSendingByDaily) {}

  execute(typeAccont: string): LimitSendingByDaily {
    if (typeAccont === 'corrente') {
      return new LimitSendingByDaily({
        limit: 4000,
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
