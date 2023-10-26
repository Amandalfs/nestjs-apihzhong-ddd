import { LimitWithdraw } from './../../value-objects/limitWithdraw.value-object';

export abstract class GenerateLimitWithdraw {
  abstract execute(typeAccount: string): LimitWithdraw;
}
