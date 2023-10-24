import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function resolversBuilder(options : BuildOptions): webpack.ResolveOptions {
  const { mode, paths, isDev } = options;
  return {
    modules: [paths.src, 'node_modules'],
    alias: {
      src: paths.src,
    },
    extensions: ['.tsx', '.ts', '.js'],
  };
}
