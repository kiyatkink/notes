import { RuleSetRule } from 'webpack';

export function typescriptLoader(): RuleSetRule {
  return {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }
}
