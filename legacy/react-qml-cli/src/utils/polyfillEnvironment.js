/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * polyfillEnvironment.js
 *
 * This file is loaded as a part of user bundle
 */

/* eslint-disable import/no-extraneous-dependencies */
require('es6-map/implement');
require('es6-set/implement');
require('es6-symbol/implement');

// WeakMap polyfill not working in qml js environment
global.WeakMap = Map;
require('../../vendor/polyfills/console.js')(global);
require('../../vendor/polyfills/timer.js')(global);
require('../../vendor/polyfills/websocket.js')(global);
require('../../vendor/polyfills/promise.js')(global);
require('../../vendor/polyfills/fetch.js')(global);
// require('../../vendor/polyfills/crypto.js')(global);
require('../../vendor/polyfills/error-guard.js');
require('../../vendor/polyfills/Number.es6.js');
require('../../vendor/polyfills/String.prototype.es6.js');
require('../../vendor/polyfills/Array.prototype.es6.js');
require('../../vendor/polyfills/Array.es6.js');
// require('../../vendor/polyfills/Object.es6.js');
require('../../vendor/polyfills/Object.es7.js');
require('../../vendor/polyfills/babelHelpers.js');

// HACK:
//   This is horrible.  I know.  But this hack seems to be needed due to the way
//   React Native lazy evaluates `fetch` within `InitializeCore`.  This was fixed
//   in 34-ish, but seems to be back again.  I hope I'm wrong because I lost sleep
//   on this one.
//
//   Without this in place, global.fetch will be undefined and cause the symbolicate
//   check to fail.  This must be something that the packager is doing that haul isn't.
//   I also so people complaining about this in Jest as well.
//
if (!global.self) {
  global.self = global; /* eslint-disable-line */
}

if (!global.window) {
  global.window = global;
}

require('./setupDevTools')(global);

// require('InitializeCore');

require('../hot/client/importScriptsPolyfill');
