import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function devServerBuilder(options : BuildOptions): DevServerConfiguration {
  const {
    mode, paths, isDev, PORT,
  } = options;
  return {
    port: PORT,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
