export const BAD_REQUEST = '400000: Bad request';

export const SHOPIFY_API_VALIDATION_ERROR = (
  errorText?: string,
): '400001: Shopify API validation error' | `400001: ${string}` =>
  errorText
    ? `400001: ${errorText.replaceAll(':', '').replaceAll('ERROR', '').trim()}`
    : '400001: Shopify API validation error';

export const EMAIL_NOT_VERIFIED = '400002: Email not verified';

export const EMAIL_IS_VERIFIED = '400003: Email is verified';

export const PRISMA_API_ERROR = '400023: Prismic API error';

export const UNAUTHORIZED_RESOURCE = '401000: Unauthorized resource';

export const FORBIDDEN_RESOURCE = '403000: Forbidden resource';

export const NOT_FOUND = '404000: Not found';

export const SHOPIFY_API_CONFIG_NOT_FOUND =
  '404001: Shopify API Config Not found';

export const SHOPIFY_API_RATE_LIMIT_NOT_FOUND =
  '404002: Shopify API Rate Limit Not found';

export const CONFLICT = '409000: Conflict';

export const USER_CONFLICT = '409001: User with this email already exists';

export const VALIDATION_ERROR = '422000: Validation error';

export const RATE_LIMIT_EXCEEDED = '429000: Rate limit exceeded';

export const INTERNAL_SERVER_ERROR = '500000: Internal server error';

export const DEFAULT_SHOPIFY_QUERY_PARAMS_ERROR = (
  errorText?: string,
): '500001: Invalid Default Shopify Query Params' | `500001: ${string}` =>
  errorText
    ? `500001: ${errorText.replaceAll(':', '').replaceAll('ERROR', '').trim()}`
    : '500001: Invalid Default Shopify Query Params';

export const INVALID_SHOPIFY_QUERY_TYPE = '500002: Invalid Shopify Query Type';

export const JSON_PARSING_ERROR = '500003: JSON parsing error';

export const SERVICE_NOT_AVAILABLE_ERROR = '503000 Service Unavailable';

export const SHOPIFY_API_NOT_AVAILABLE_ERROR =
  '503001: Shopify API is not available';

export const TO_MANY_CONNECTIONS_TO_SHOPIFY_API =
  '503002: To many connections to the Shopify API';

export const SHOPIFY_API_CONNECTIONS_LEAK =
  '503003: Shopify API connections leak';
