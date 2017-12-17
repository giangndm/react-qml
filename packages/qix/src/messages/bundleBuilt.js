/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */
import type { WebpackStats } from '../types';

const chalk = require('chalk');
const dedent = require('dedent');

const path = require('path');

const getBuildTime = webpackStats => {
  const stats = webpackStats.toJson({ timing: true });
  return stats.time
    ? stats.time
    : Math.max(...stats.children.map(({ time }) => time));
};

module.exports = ({
  stats,
  platform,
  assetsPath,
  bundlePath,
}: {
  stats: WebpackStats,
  platform: string,
  assetsPath?: string,
  bundlePath?: string,
}) => {
  const warnings = stats.toJson({ warnings: true }).warnings;
  const heading = stats.hasWarnings()
    ? chalk.yellow(
        `Built with warnings in ${(getBuildTime(stats) / 1000).toFixed(2)}s!`
      )
    : `Built successfully in ${(getBuildTime(stats) / 1000).toFixed(2)}s!`;

  if (assetsPath && bundlePath) {
    return dedent`
      ${heading}

      Assets location: ${chalk.grey(assetsPath)}
      Bundle location: ${chalk.grey(path.join(assetsPath, bundlePath))}      
    `;
  }

  const device = platform === 'all' ? 'your device' : `your ${platform} device`;

  return dedent`
    ${heading}
    ${warnings.length ? `\n${warnings.join('\n\n')}\n` : ''}
    You can now run the app on ${device}\n
  `;
};
