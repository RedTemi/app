/* eslint-disable global-require */

if (global.Intl === undefined) {
  require('intl');
  require('intl/locale-data/jsonp/en-US');
  require('intl/locale-data/jsonp/en-DK');
}
