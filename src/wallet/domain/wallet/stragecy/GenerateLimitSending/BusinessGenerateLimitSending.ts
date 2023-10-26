import { LimitSending } from '../../value-objects/limitSending.value-object';
import { GenerateLimitSending } from './GenerateLimitSending.interface';

export class BusinessGenerateLimitSending implements GenerateLimitSending {
  private limit: number = 1500;
  constructor(private next?: GenerateLimitSending) {}

  execute(typeAccont: string): LimitSending {
    if (typeAccont === 'empresarial') {
      return new LimitSending({
        limit: this.limit,
      });
    }
    if (!this.next) throw Error();
    return this.next.execute(typeAccont);
  }
}
