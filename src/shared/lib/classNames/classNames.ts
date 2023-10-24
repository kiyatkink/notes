export type FlagsType = Record<string, boolean | string | undefined>
export function classNames(mainClass: string, flags: FlagsType, classes: Array<string | undefined>): string {
  return [
    mainClass,
    ...classes.filter(Boolean),
    ...Object.entries(flags)
      .filter(([key, value]) => Boolean(value))
      .map(([key]) => key),
  ].join(' ');
}
