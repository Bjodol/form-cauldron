import { ValidatorFunction } from "../..";

type BaseCheck = (value: any) => boolean;

const isNumberCheck: BaseCheck = value => {
  return !isNaN(parseFloat(`${value}`)) && isFinite(parseFloat(`${value}`));
};

export const isNumber: ValidatorFunction = (value, errorMsg) => {
  if (isNumberCheck(value)) return;
  return errorMsg || `Value must be a number`;
};

export const minimum: ValidatorFunction = (value, errorMsg, min: number) => {
  if (isNumberCheck(value) && value >= min) return;
  return errorMsg || `Value must be minimum: ${min}`;
};

export const maximum: ValidatorFunction = (value, errorMsg, max: number) => {
  if (isNumberCheck(value) && value <= max) return;
  return errorMsg || `Value must be maximum: ${max}`;
};

export const isAbove: ValidatorFunction = (value, errorMsg, min: number) => {
  if (isNumberCheck(value) && value > min) return;
  return errorMsg || `Value must be above: ${min}`;
};

export const isBelow: ValidatorFunction = (value, errorMsg, max: number) => {
  if (isNumberCheck(value) && value < max) return;
  return errorMsg || `Value must be below: ${max}`;
};

export const isBeetwen: ValidatorFunction = (
  value,
  errorMsg,
  min: number,
  max: number
) => {
  if (isNumberCheck(value) && value > min && value < max) return;
  return errorMsg || `Value must be between ${min} and ${max}`;
};

export const isBeetwenOrEqual: ValidatorFunction = (
  value,
  errorMsg,
  min: number,
  max: number
) => {
  if (isNumberCheck(value) && value >= 0 && value <= max) return;
  return errorMsg || `Value must be between or equal to ${min} and ${max}`;
};
