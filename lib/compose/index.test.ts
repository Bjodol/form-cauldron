import { composeValidators } from ".";
import { ValidatorFunction } from "../";

const VALUE = "Value";
const ERROR_MSG = "Invalid value";
const VALID_FUNCTION: ValidatorFunction = value => {};
const INVALID_FUNCTION: ValidatorFunction = value => ERROR_MSG;

describe("composeValidators", () => {
  it("should return a function", () => {
    const fnA: ValidatorFunction = VALID_FUNCTION;
    const fnB: ValidatorFunction = INVALID_FUNCTION;
    expect(composeValidators(fnA, fnB)).toEqual(expect.any(Function));
  });

  it("should call all functions if all are valid", () => {
    const callbackA = jest.fn(VALID_FUNCTION);
    const callbackB = jest.fn(VALID_FUNCTION);
    const validator = composeValidators(callbackA, callbackB);
    validator(VALUE);
    expect(callbackA).toBeCalledTimes(1);
    expect(callbackB).toBeCalledTimes(1);
  });

  it("should stop after one invalid validation", () => {
    const callbackA = jest.fn(VALID_FUNCTION);
    const callbackB = jest.fn(INVALID_FUNCTION);
    const callbackC = jest.fn(VALID_FUNCTION);
    const validator = composeValidators(callbackA, callbackB, callbackC);
    validator(VALUE);
    expect(callbackA).toBeCalledTimes(1);
    expect(callbackB).toBeCalledTimes(1);
    expect(callbackC).toBeCalledTimes(0);
  });

  it("should return nothing on all valid", () => {
    const callbackA = jest.fn(VALID_FUNCTION);
    const callbackB = jest.fn(VALID_FUNCTION);
    const validator = composeValidators(callbackA, callbackB);
    expect(validator(VALUE)).toBe(undefined);
    expect(callbackA.mock.calls[0][0]).toBe(VALUE);
    expect(callbackB.mock.calls[0][0]).toBe(VALUE);
    expect(callbackA.mock.results[0].value).toBe(undefined);
    expect(callbackB.mock.results[0].value).toBe(undefined);
  });

  it("should return a string on invalid", () => {
    const callbackA = jest.fn(VALID_FUNCTION);
    const callbackB = jest.fn(INVALID_FUNCTION);
    const validator = composeValidators(callbackA, callbackB);
    expect(validator(VALUE)).toBe(ERROR_MSG);
    expect(callbackA.mock.calls[0][0]).toBe(VALUE);
    expect(callbackB.mock.calls[0][0]).toBe(VALUE);
    expect(callbackA.mock.results[0].value).toBe(undefined);
    expect(callbackB.mock.results[0].value).toBe(ERROR_MSG);
  });
});
