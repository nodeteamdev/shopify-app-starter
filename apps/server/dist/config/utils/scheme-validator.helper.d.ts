import { Logger } from '@nestjs/common';
import { z, ZodRawShape } from 'zod';
export declare function validateScheme<T extends ZodRawShape>(scheme: z.ZodObject<T>, config: Record<string, any>, logger: Logger): void;
