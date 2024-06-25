import { LogSeverity } from '../types';
import { ConfigInterface } from '../base-types';
export type LoggerFunction = (severity: LogSeverity, message: string, context?: Record<string, any>) => void;
export declare function log(config: ConfigInterface): LoggerFunction;
//# sourceMappingURL=log.d.ts.map