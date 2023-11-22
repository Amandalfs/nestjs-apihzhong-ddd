import { Injectable } from '@nestjs/common';
import { HandlerInterface } from '@/@shared/events/handler.interface';
import { CreateCredencialsEvent } from './CreateCredencials';
import { AuthUserFacadeInterface } from '@/auth-user/facade/authUserFacade.interface';

@Injectable()
export class CreateCredencialsHandler
  implements HandlerInterface<CreateCredencialsEvent>
{
  constructor(private authUserFacade: AuthUserFacadeInterface) {}

  async handle(createCredencialsEvent: CreateCredencialsEvent): Promise<void> {
    await this.authUserFacade.createUserAuth({
      customerId: createCredencialsEvent.eventData.customerId,
      email: createCredencialsEvent.eventData.email,
      password: createCredencialsEvent.eventData.password,
    });
  }
}
