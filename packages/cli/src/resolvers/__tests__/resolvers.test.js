/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import config from './fixtures/webpack.config.js';
import AssetResolver from '../AssetResolver';

const filesFromEntry = [
  require.resolve('./fixtures/file.pdf'),
  require.resolve('./fixtures/file@1x.jpeg'),
  require.resolve('./fixtures/file@3x.png'),
  require.resolve('./fixtures/file@2x.gif'),
];

const runWebpack = (assertion: (assetPaths: Array<string>) => void, done) => {
  webpack(config, (err, stats) => {
    if (err) {
      done.fail(err);
    } else if (stats.hasErrors()) {
      done.fail(stats.toString());
    }
    const assetPaths = stats.toJson().modules.map(module => module.identifier);

    try {
      assertion(assetPaths);
      done();
    } catch (error) {
      done.fail(error);
    }
  });
};

test('resolves to file@{number}x.{ext} if file.{ext} not present', done => {
  runWebpack(assetPaths => {
    expect(assetPaths).toEqual(expect.arrayContaining(filesFromEntry));
  }, done);
});

test('resolves Haste modules', done => {
  runWebpack(assetPaths => {
    expect(assetPaths).toEqual(
      expect.arrayContaining([require.resolve('./fixtures/HasteModule.js')])
    );
  }, done);
});

test('AssetResolver.collect returns empty object for empty list', () => {
  const result = AssetResolver.collect([], {
    name: 'filename',
    type: 'jpeg',
    platform: 'native',
  });

  expect(result).toEqual({});
});

test('AssetResolver.collect returns empty object when file not in the list', () => {
  const result = AssetResolver.collect(['file.jpeg', 'filename.png'], {
    name: 'filename',
    type: 'jpeg',
    platform: 'android',
  });

  expect(result).toEqual({});
});

test('AssetResolver.collect returns a map of paths to resolve', () => {
  const files = fs.readdirSync(path.resolve(__dirname, './fixtures'));
  const result = AssetResolver.collect(files, {
    name: 'filename',
    type: 'jpeg',
    platform: 'ios',
  });

  expect(result).toMatchSnapshot();
});
