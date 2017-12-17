#!/usr/bin/env node

require('babel-register')({
  ignore: /node_modules(?!\/haul)/,
  retainLines: true,
  sourceMaps: 'inline',
});

require('../src/cli');
