import { BusinessGenerateLimitWithdrawByDaily } from '../stragecy/GenerateLimitWithdrawByDaily/BusinessGenerateLimitWithdrawByDaily';
import { ChainGenerateLimitWithdrawByDaily } from '../stragecy/GenerateLimitWithdrawByDaily/ChainGenerateLimitWithdrawByDaily';
import { GenerateLimitWithdrawByDaily } from '../stragecy/GenerateLimitWithdrawByDaily/GenerateLimitWithdrawByDaily.interface';
import { SavingGenerateLimitWithdrawByDaily } from './../stragecy/GenerateLimitWithdrawByDaily/SavingsGenerateLimitWithdrawByDaily';

export class MakeGenerateLimitWithdrawDaily {
  static execute(): GenerateLimitWithdrawByDaily {
    const savingGenerate = new SavingGenerateLimitWithdrawByDaily();
    const chainGenerate = new ChainGenerateLimitWithdrawByDaily(savingGenerate);
    const businessGenerate = new BusinessGenerateLimitWithdrawByDaily(
      chainGenerate,
    );
    return businessGenerate;
  }
}
