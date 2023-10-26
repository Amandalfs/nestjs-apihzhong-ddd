import { LimitSendingByDaily } from '../../value-objects/limitSendingByDaily.object-value';

export abstract class GenerateLimitSendingByDaily {
  abstract execute(typeAccont: string): LimitSendingByDaily;
}
