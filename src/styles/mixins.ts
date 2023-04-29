interface BreakpointValues {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const breakpoints = {
  smUp: `@media (min-width: ${breakpointValues.sm}px)`,
  mdUp: `@media (min-width: ${breakpointValues.md}px)`,
  lgUp: `@media (min-width: ${breakpointValues.lg}px)`,
  xlUp: `@media (min-width: ${breakpointValues.xl}px)`,
  smDown: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  mdDown: `@media (max-width: ${breakpointValues.md - 1}px)`,
  lgDown: `@media (max-width: ${breakpointValues.lg - 1}px)`,
  xlDown: `@media (max-width: ${breakpointValues.xl - 1}px)`,
  down: (key: keyof BreakpointValues) =>
    `@media (max-width: ${breakpointValues[key] - 1}px)`,
  up: (key: keyof BreakpointValues) =>
    `@media (min-width: ${breakpointValues[key]}px)`,
  ...breakpointValues,
};

type AlignItemValues = "center" | "flex-start" | "flex-end" | "stretch";
type JustifyContentValues =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export const flexAlign = (
  alignItems: AlignItemValues = "center",
  justifyContent: JustifyContentValues = "center"
) => `
  display: flex;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
`;

export const shadow = (level: number) => {
  const shadows = [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.1)",
    "0px 4px 8px rgba(0, 0, 0, 0.1)",
    "0px 8px 16px rgba(0, 0, 0, 0.1)",
    "0px 16px 24px rgba(0, 0, 0, 0.1)",
    "0px 24px 32px rgba(0, 0, 0, 0.1)",
  ];

  return shadows[level];
};

export const spacing = (level: number) => `${level * 8}`;
