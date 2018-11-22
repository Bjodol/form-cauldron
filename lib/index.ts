export type ValidatorFunction = (
  value: any,
  errorMsg?: string,
  ...args: any[]
) => string | undefined | void;

export * from "./validators";
export { composeValidators, composeValidators as default } from "./compose";
