import {
  isEmpty, isEmail, isNumber, hasLength, hasMinLength,
} from "../FormValidations";
import "jest";

describe("FormValidations", () => {
  const FIELD_NAME = "FIELD_NAME";
  describe("isEmpty", () => {
    describe("given a non string value", () => {
      it("should throw", () => {
        const value = {};
        expect(() => isEmpty(FIELD_NAME, value as unknown as string)).toThrow();
      });
    });

    describe("given an empty value", () => {
      it("should return an error", () => {
        const value = "";
        expect(isEmpty(FIELD_NAME, value)).toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_isEmpty` });
      });
    });

    describe("given a valid value", () => {
      it("should not return no error", () => {
        const value = "value";
        expect(isEmpty(FIELD_NAME, value)).toBe(undefined);
      });
    });
  });

  describe("isEmail", () => {
    describe("given a non string value", () => {
      it("should throw", () => {
        const value = {};
        expect(() => isEmail(FIELD_NAME, value as unknown as string)).toThrow();
      });
    });

    describe("given an empty value", () => {
      it("should return no error", () => {
        const value = "";
        expect(isEmail(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given a valid email", () => {
      it("should return no error", () => {
        const value = "email@exemple.ca";
        expect(isEmail(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given a custom email doamin", () => {
      it("should return no error", () => {
        const value = "email+something@nexapp.ca";
        expect(isEmail(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given an invalid email", () => {
      it("should return an error", () => {
        const value = "notAnEmail";
        expect(isEmail(FIELD_NAME, value)).toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_isEmail` });
      });
    });
  });

  describe("isNumber", () => {
    describe("given a string containing only numbers", () => {
      it("should return no error", () => {
        const value = "123";
        expect(isNumber(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given an string containing letters", () => {
      it("should return an error", () => {
        const value = "notANumber";
        expect(isNumber(FIELD_NAME, value)).toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_isNumber` });
      });
    });
  });

  describe("hasLength", () => {
    const LENGTH = 10;
    describe("given a non string or array value", () => {
      it("should throw", () => {
        const value = {};
        expect(() => hasLength(LENGTH)(FIELD_NAME, value as unknown as string)).toThrow();
      });
    });

    describe("given an empty value", () => {
      it("should return an error", () => {
        const value = "";
        expect(hasLength(LENGTH)(FIELD_NAME, value))
          .toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_hasLength:${LENGTH}` });
      });
    });

    describe("given a value equal to given lenght", () => {
      it("should return no error", () => {
        const value = "1234567890";
        expect(hasLength(LENGTH)(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given a value longer than length", () => {
      it("should return an error", () => {
        const value = "1234567890123456789";
        expect(hasLength(LENGTH)(FIELD_NAME, value))
          .toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_hasLength:${LENGTH}` });
      });
    });

    describe("given a value shorter than length", () => {
      it("should return an error", () => {
        const value = "123";
        expect(hasLength(LENGTH)(FIELD_NAME, value))
          .toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_hasLength:${LENGTH}` });
      });
    });
  });

  describe("hasMinLength", () => {
    const LENGTH = 10;
    describe("given a non string or array value", () => {
      it("should throw", () => {
        const value = {};
        expect(() => hasMinLength(LENGTH)(FIELD_NAME, value as unknown as string)).toThrow();
      });
    });

    describe("given an empty value", () => {
      it("should return an error", () => {
        const value = "";
        expect(hasMinLength(LENGTH)(FIELD_NAME, value))
          .toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_hasMinLength:${LENGTH}` });
      });
    });

    describe("given a value equal to given length", () => {
      it("should return no error", () => {
        const value = "1234567890";
        expect(hasMinLength(LENGTH)(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given a value longer to given length", () => {
      it("should return no error", () => {
        const value = "1234567890123456789";
        expect(hasMinLength(LENGTH)(FIELD_NAME, value)).toBe(undefined);
      });
    });

    describe("given a value shorter than minimum length", () => {
      it("should return an error", () => {
        const value = "123";
        expect(hasMinLength(LENGTH)(FIELD_NAME, value))
          .toEqual({ field: FIELD_NAME, error: `${FIELD_NAME}_hasMinLength:${LENGTH}` });
      });
    });
  });
});
