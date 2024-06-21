import * as Sentry from '@sentry/node';

export const sendErrorToSentry = (
  error: Error,
  data: Record<string, any> = {},
): void => {
  Sentry.withScope((scope) => {
    const keys = Object.keys(data);

    if (keys.length > 0) {
      keys.forEach((key) => {
        scope.setTag(key, JSON.stringify(data[key]));
      });
    }

    scope.addEventProcessor((event) => {
      return Sentry.Handlers.parseRequest(event, {});
    });

    return Sentry.captureException(error);
  });
};
