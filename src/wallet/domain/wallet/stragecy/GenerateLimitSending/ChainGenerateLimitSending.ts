import { LimitSending } from '../../value-objects/limitSending.value-object';
import { GenerateLimitSending } from './GenerateLimitSending.interface';

export class ChainGenerateLimitSending implements GenerateLimitSending {
  private limit: number = 800;
  constructor(private next?: GenerateLimitSending) {}

  execute(typeAccont: string): LimitSending {
    if (typeAccont === 'corrente') {
      return new LimitSending({
        limit: this.limit,
      });
    }
    if (!this.next) throw Error();
    return this.next.execute(typeAccont);
  }
}
