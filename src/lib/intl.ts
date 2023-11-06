/* eslint-disable global-require */

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!global.Intl === undefined) {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
  require('intl/locale-data/jsonp/en-DK');
}

export {};
