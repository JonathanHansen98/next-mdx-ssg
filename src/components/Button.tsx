import { FunctionComponent, HTMLAttributes } from "react";

export const Button: FunctionComponent<HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <button>{props.children}</button>;
};
