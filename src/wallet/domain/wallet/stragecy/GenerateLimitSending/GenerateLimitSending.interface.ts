import { LimitSending } from './../../value-objects/limitSending.value-object';

export abstract class GenerateLimitSending {
  abstract execute(typeAccont: string): LimitSending;
}
