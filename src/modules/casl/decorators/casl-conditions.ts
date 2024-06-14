import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextProxy } from '@modules/casl/proxies/context.proxy';

export const CaslConditions = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = await ContextProxy.create(context).getRequest();

    return request.casl.conditions;
  },
);
