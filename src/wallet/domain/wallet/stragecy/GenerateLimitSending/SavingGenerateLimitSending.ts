import { LimitSending } from '../../value-objects/limitSending.value-object';
import { GenerateLimitSending } from './GenerateLimitSending.interface';

export class SavingGenerateLimitSending implements GenerateLimitSending {
  private limit: number = 300;
  constructor(private next?: GenerateLimitSending) {}

  execute(typeAccont: string): LimitSending {
    if (typeAccont === 'poupanca') {
      return new LimitSending({
        limit: this.limit,
      });
    }
    if (!this.next) throw Error();
    return this.next.execute(typeAccont);
  }
}
