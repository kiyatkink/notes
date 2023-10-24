import webpack from 'webpack';
import { pluginsBuilder } from './pluginsBuilder';
import { loadersBuilder } from './loadersBuilder';
import { resolversBuilder } from './resolversBuilder';
import { BuildOptions } from './types/config';
import { devServerBuilder } from './devServerBuilder';

export function buildWebpackConfig(options : BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.dist,
      clean: true,
      publicPath: '/',
      pathinfo: true,
    },
    plugins: pluginsBuilder(options),
    module: {
      rules: loadersBuilder(options),
    },
    resolve: resolversBuilder(options),
    devServer: isDev ? devServerBuilder(options) : undefined,
    devtool: isDev ? 'inline-source-map' : undefined,
  };
}
