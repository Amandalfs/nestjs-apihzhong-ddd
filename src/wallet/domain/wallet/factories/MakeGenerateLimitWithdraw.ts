import { BusinessGenerateLimitWithdraw } from '../stragecy/GenerateLimitWithdraw/BusinessGenerateLimitWithdraw';
import { ChainGenerateLimitWithdraw } from '../stragecy/GenerateLimitWithdraw/ChainGenerateLimitWithdraw';
import { GenerateLimitWithdraw } from '../stragecy/GenerateLimitWithdraw/GenerateLimitWithdraw.interface';
import { SavingGenerateLimitWithdraw } from '../stragecy/GenerateLimitWithdraw/SavingsGenerateLimitWithdraw';

export class MakeGenerateLimitWithdraw {
  static execute(): GenerateLimitWithdraw {
    const savingGenerate = new SavingGenerateLimitWithdraw();
    const chainGenerate = new ChainGenerateLimitWithdraw(savingGenerate);
    const bussinesGenerate = new BusinessGenerateLimitWithdraw(chainGenerate);
    return bussinesGenerate;
  }
}
