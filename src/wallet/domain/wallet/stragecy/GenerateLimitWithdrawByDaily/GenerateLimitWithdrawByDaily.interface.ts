import { LimitWithdrawByDaily } from '../../value-objects/limitWithdrawByDaily.object-value';

export abstract class GenerateLimitWithdrawByDaily {
  abstract execute(typeAccount: string): LimitWithdrawByDaily;
}
