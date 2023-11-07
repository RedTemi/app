import { captureException } from './sentry';

function errorHandler(error) {
  if (error === undefined) return;
  // eslint-disable-next-line no-console
  console.error(error);
  captureException(error);
}

export default errorHandler;
