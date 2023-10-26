import { SavingGenerateLimitSendingByDaily } from './../stragecy/GenerateLimitSendingByDaily/SavingsGenerateLimitSendingByDaily';
import { ChainGenerateLimitSendingByDaily } from './../stragecy/GenerateLimitSendingByDaily/ChainGenerateLimitSendingByDaily';
import { GenerateLimitSendingByDaily } from '../stragecy/GenerateLimitSendingByDaily/GenerateLimitSendingByDaily.interface';
import { BusinessGenerateLimitSendingByDaily } from '../stragecy/GenerateLimitSendingByDaily/BusinessGenerateLimitSendingByDaily';

export class MakeGenerateLimitSendingDaily {
  static execute(): GenerateLimitSendingByDaily {
    const savingGenerate = new SavingGenerateLimitSendingByDaily();
    const chainGenerate = new ChainGenerateLimitSendingByDaily(savingGenerate);
    const bussinesGenerate = new BusinessGenerateLimitSendingByDaily(
      chainGenerate,
    );
    return bussinesGenerate;
  }
}
