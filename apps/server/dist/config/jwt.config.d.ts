import { z } from 'zod';
declare const scheme: z.ZodObject<{
    access: z.ZodObject<{
        secret: z.ZodString;
        expTime: z.ZodObject<{
            milliseconds: z.ZodNumber;
            seconds: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            milliseconds?: number;
            seconds?: number;
        }, {
            milliseconds?: number;
            seconds?: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }>;
    refresh: z.ZodObject<{
        secret: z.ZodString;
        expTime: z.ZodObject<{
            milliseconds: z.ZodNumber;
            seconds: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            milliseconds?: number;
            seconds?: number;
        }, {
            milliseconds?: number;
            seconds?: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }>;
    resetPassword: z.ZodObject<{
        secret: z.ZodString;
        expTime: z.ZodObject<{
            milliseconds: z.ZodNumber;
            seconds: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            milliseconds?: number;
            seconds?: number;
        }, {
            milliseconds?: number;
            seconds?: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }>;
    verifyEmail: z.ZodObject<{
        secret: z.ZodString;
        expTime: z.ZodObject<{
            milliseconds: z.ZodNumber;
            seconds: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            milliseconds?: number;
            seconds?: number;
        }, {
            milliseconds?: number;
            seconds?: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }, {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    access?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    refresh?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    resetPassword?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    verifyEmail?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
}, {
    access?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    refresh?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    resetPassword?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    verifyEmail?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
}>;
export type JwtConfig = Required<z.infer<typeof scheme>>;
export declare const jwtConfig: (() => JwtConfig) & import("@nestjs/config").ConfigFactoryKeyHost<Required<{
    access?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    refresh?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    resetPassword?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
    verifyEmail?: {
        secret?: string;
        expTime?: {
            milliseconds?: number;
            seconds?: number;
        };
    };
}>>;
export {};
