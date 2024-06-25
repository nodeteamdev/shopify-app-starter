import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextProxy } from '@modules/casl/proxies/context.proxy';
import { CaslConfig } from '@modules/casl/casl.config';
import { UserProxy } from '@modules/casl/proxies/user.proxy';

export const CaslUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    return new UserProxy(
      await ContextProxy.create(context).getRequest(),
      CaslConfig.getRootOptions().getUserFromRequest,
    );
  },
);
