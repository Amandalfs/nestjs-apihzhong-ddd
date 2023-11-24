import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const WalletId = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.walletId;
  },
);

export const CustomerId = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.customerId as string;
  },
);

export const RuleCustomer = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.rule;
  },
);
