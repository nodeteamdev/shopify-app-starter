import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SubjectProxy } from '@modules/casl/proxies/subject.proxy';
import { ContextProxy } from '@modules/casl/proxies/context.proxy';

export const CaslSubject = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    return new SubjectProxy(await ContextProxy.create(context).getRequest());
  },
);
