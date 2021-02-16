import { passwordRegex } from "../inputRegex";

describe("inputRegex", () => {

  beforeEach(() => {
    jest.clearAllMocks().resetModules();
  });

  describe("passwordRegex", () => {
    it("should be invalid given a password with only a special character", () => {
      const invalidPassword = ".";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only special characters and a length of 8+ characters", () => {
      const invalidPassword = "^$*.[]{}()?-!@#%&/\,><':;|_~";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only an alphanumeric character", () => {
      const invalidPassword = "c";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only alphanumeric characters and a length of 8+ characters", () => {
      const invalidPassword = "Abcd1234";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only a caps character", () => {
      const invalidPassword = "K";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only caps characters and a length of 8+ characters", () => {
      const invalidPassword = "ABCDEFGHI";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only a number", () => {
      const invalidPassword = "42";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password with only caps numbers and a length of 8+ characters", () => {
      const invalidPassword = "87654321";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password without a special character", () => {
      const invalidPassword = "Harry4242";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password without a caps character", () => {
      const invalidPassword = "harry6742!";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be invalid given a password without a length of 8+ characters", () => {
      const invalidPassword = "Harry4@";

      expect(passwordRegex.test(invalidPassword)).toBeFalsy();
    });

    it("should be valid given a password with at least a caps character, a number, a special character" +
      "and a length of 8+ characters", () => {
      const validPassword = "H42.arry";

      expect(passwordRegex.test(validPassword)).toBeTruthy();
    });

  });

});
