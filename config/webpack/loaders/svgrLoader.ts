import { RuleSetRule } from 'webpack';

export function svgrLoader(): RuleSetRule {
  return {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  }
}
