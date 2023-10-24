import webpack from 'webpack';
import path from 'path';
import * as process from 'process';
import dotenv from 'dotenv';
import { BuildPaths, EnvBuildVariables, Mode } from './config/webpack/types/config';
import { buildWebpackConfig } from './config/webpack/buildWebpackConfig';

export default (env: EnvBuildVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    dist: path.resolve(__dirname, 'dist'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    env: path.resolve(__dirname, `.env.${env.mode || 'dev'}`),
  };

  dotenv.config({ path: paths.env });

  const mode: Mode = process.env.MODE as Mode || 'development';

  const isDev = mode === 'development';

  const PORT = process.env.PORT || '3000';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    PORT: +PORT,
  });

  return config;
};
