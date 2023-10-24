import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function pluginsBuilder(options : BuildOptions): Array<webpack.WebpackPluginInstance> {
  const { mode, paths, isDev } = options;

  const config: Array<webpack.WebpackPluginInstance> = [
    new webpack.ProgressPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new MiniCssExtractPlugin(),
  ]

  if (isDev) {
    config.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
    )
  }

  return config;
}
