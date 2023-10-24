import { RuleSetRule } from 'webpack';

export function fileLoader(): RuleSetRule {
  return {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }
}
