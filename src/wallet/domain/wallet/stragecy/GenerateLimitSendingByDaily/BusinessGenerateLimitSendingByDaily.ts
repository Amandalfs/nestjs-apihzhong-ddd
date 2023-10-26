import { LimitSendingByDaily } from '../../value-objects/limitSendingByDaily.object-value';
import { GenerateLimitSendingByDaily } from './GenerateLimitSendingByDaily.interface';

export class BusinessGenerateLimitSendingByDaily
  implements GenerateLimitSendingByDaily
{
  private limit: number = 6000;
  constructor(private next?: GenerateLimitSendingByDaily) {}

  execute(typeAccont: string): LimitSendingByDaily {
    if (typeAccont === 'empresarial') {
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
