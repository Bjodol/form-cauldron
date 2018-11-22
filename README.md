# Form-Cauldron

A composable library for validation user input in a user and developer friendly way.

## Quick intro

This library makes it easy to validate form input and give good user feedback using composability. The `composeValidators` function takes in a series of validation rules and returns the first broken rule as a string. If no rule is broken `undefined` is returned.

A couple of examples below:

### Using default user feedback

```
//Defining the validation rules
const validator = composeValidators(isFilled, isNumber, value =>
    isBeetwen(value, "", -2, 2)
);

validator(null) // Output: "Please enter a value"
validator("a") // Output: "Value must be a number"
validator("-3") // Output: "Value must be between -2 and 2"
```

### Using custom user feedback:

```
//Defining the validation rules
const validator = composeValidators(
    value => isFilled(value, "Silly enter something"),
    value => isNumber(value, "Input must be a number silly"),
    value => isBeetwen(value, "Hey! The number must be between -2 and 2", -2, 2)
);

validator(null) // Output: "Silly enter something"
validator("a") // Output: "Input must be a number silly"
validator("-3") // Output: "Hey! The number must be between -2 and 2"
```

### Define your own rules:

Simply define your own rules by defining validator functions on the format: `(value) => string | undefined`.

```
const validator = composeValidators(
    value => !value ? "There is nothing here!" : undefined,
    value => value === "cake" ? "The Cake is a lie!" : undefined,
    value => value === "Cookie" ? "No cookies allowed!" : undefined
)
```

## Installation

WIP will soon be pushed to npm

## Project status:

Just started, will update as we go.
