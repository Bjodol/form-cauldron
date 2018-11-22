import { ValidatorFunction } from "../";

export type ComposeValidatorsFn = (
  ...args: ValidatorFunction[]
) => ValidatorFunction;

export const composeValidators: ComposeValidatorsFn = function(...args) {
  return function(value) {
    for (let fn of args) {
      const invalid = fn(value);
      if (!!invalid) {
        return invalid;
      }
    }
  } as ValidatorFunction;
};
