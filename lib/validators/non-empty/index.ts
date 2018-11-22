import { ValidatorFunction } from "../..";

export const isFilled: ValidatorFunction = (value, errorMsg) => {
  if (value === 0 || !!value) return;
  return errorMsg || "Please enter a value";
};
