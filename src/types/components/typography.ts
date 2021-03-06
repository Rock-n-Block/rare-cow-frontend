/* eslint-disable no-shadow */
enum ColorValues {
  default,
  secondary,
  error,
  gray6,
  darkDefault,
  dark0,
  dark1,
  accent,
  light,
  light1,
  light3,
  light4,
  iris100,
  metal50,
  metal400,
  metal600,
  metal700,
  metal800,
  base900,
  yellow500,
}

enum SizeValues {
  xs,
  s,
  m,
  l,
}

enum WeightValues {
  normal,
  medium,
  semiBold,
  bold,
}

enum Aligns {
  center,
  left,
  right,
}

enum HeadingTypes {
  h1,
  h2,
  h3,
}

export type TextColor = keyof typeof ColorValues;
export type TextSize = keyof typeof SizeValues;
export type TextWeight = keyof typeof WeightValues;
export type TextAlign = keyof typeof Aligns;
export type HeadingType = keyof typeof HeadingTypes;
