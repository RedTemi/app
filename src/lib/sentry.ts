import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://a15597dd9ca74808a45982c29142ecc5@o285707.ingest.sentry.io/5217729',
  enableInExpoDevelopment: false,
  enableAutoSessionTracking: true,
});

const { captureException, captureMessage, setUser } = Sentry.Native;

export default Sentry;
export { captureException, captureMessage, setUser };
