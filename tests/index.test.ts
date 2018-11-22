import { isNumber, isBeetwen, isAbove } from "../lib/validators/numerics";
import composeValidators from "../lib";
import { isFilled } from "../lib/validators/non-empty";

describe("Smoketests", () => {
  it("should handle all criterias met", () => {
    const validator = composeValidators(isFilled, isNumber, value =>
      isBeetwen(value, "", -2, 2)
    );
    expect(validator(1)).toBe(undefined);
    expect(validator("1")).toBe(undefined);
    expect(validator("-1")).toBe(undefined);
  });

  it("should show the first criteria broken", () => {
    const validator = composeValidators(isFilled, isNumber, value =>
      isBeetwen(value, "Please enter a value between -2 and 2 silly!", -2, 2)
    );
    expect(validator(null)).toBe("Please enter a value");
    expect(validator("a")).toBe("Value must be a number");
    expect(validator("-3")).toBe(
      "Please enter a value between -2 and 2 silly!"
    );
  });

  it("should even handle composed validators as a validator", () => {
    const childValidator = composeValidators(isFilled, isNumber, value =>
      isBeetwen(value, "Please enter a value between -2 and 2 silly!", -2, 2)
    );
    const validator = composeValidators(childValidator, value =>
      isAbove(value, "", 0)
    );
    expect(validator(null)).toBe("Please enter a value");
    expect(validator("a")).toBe("Value must be a number");
    expect(validator("-3")).toBe(
      "Please enter a value between -2 and 2 silly!"
    );
    expect(validator(0)).toBe("Value must be above: 0");
  });
});
