import {
  checkCity
} from "../src/client/js/cityChecker"

describe("Testing the checkCity functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test("Testing true case", () => {
    // Define the input for the function, if any, in the form of variables/array
    // Define the expected output, if any, in the form of variables/array
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    expect(checkCity('Seoul')).toBe(true);
  })
});
describe("Testing the checkCity functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test("Testing false case", () => {
    // Define the input for the function, if any, in the form of variables/array
    // Define the expected output, if any, in the form of variables/array
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
    expect(checkCity('S')).toBe(false);
  })
});