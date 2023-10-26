import { BusinessGenerateLimitSending } from '../stragecy/GenerateLimitSending/BusinessGenerateLimitSending';
import { ChainGenerateLimitSending } from '../stragecy/GenerateLimitSending/ChainGenerateLimitSending';
import { GenerateLimitSending } from '../stragecy/GenerateLimitSending/GenerateLimitSending.interface';
import { SavingGenerateLimitSending } from '../stragecy/GenerateLimitSending/SavingGenerateLimitSending';

export class MakeGenerateLimitSending {
  static execute(): GenerateLimitSending {
    const savingGenerate = new SavingGenerateLimitSending();
    const chainGenerate = new ChainGenerateLimitSending(savingGenerate);
    const bussinesGenerate = new BusinessGenerateLimitSending(chainGenerate);
    return bussinesGenerate;
  }
}
