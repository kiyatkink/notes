import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { typescriptLoader } from './loaders/typescriptLoader';
import { sassLoader } from './loaders/sassLoader';
import { svgrLoader } from './loaders/svgrLoader';
import { fileLoader } from './loaders/fileLoader';

export function loadersBuilder(options : BuildOptions): Array<webpack.RuleSetRule> {
  const { mode, paths, isDev } = options;

  const ts : webpack.RuleSetRule = typescriptLoader();

  const sass: webpack.RuleSetRule = sassLoader(isDev);

  const svg = svgrLoader();

  const file = fileLoader();

  return [
    ts,
    sass,
    file,
    svg,
  ];
}
