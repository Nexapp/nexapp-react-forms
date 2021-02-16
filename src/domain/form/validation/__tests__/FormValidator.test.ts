/* eslint-disable max-classes-per-file */
import FormValidator from "../FormValidator";
import { isEmpty, isNumber } from "../FormValidations";

describe("FormValidator", () => {
  let formValidator: FormValidator<FormDataTest>;

  describe("given a first field", () => {
    describe("and only isEmpty rule", () => {
      beforeEach(() => {
        const formData: FormDataTest ={
          field1: "",
          field2: "123",
        };
        formValidator = new FormValidatorTest(formData);
        formValidator.validate();
      });

      describe("when the value is empty", () => {
        it("should have errors", () => {
          expect(formValidator.hasError()).toBeTruthy();
        });
      });
    });
  });

  describe("given a second field", () => {
    describe("and isEmpty and isNumber rules", () => {
      beforeEach(() => {
        const formData: FormDataTest = {
          field1: "something",
          field2: "",
        };
        formValidator = new FormValidatorTest(formData);
        formValidator.validate();
      });
      describe("when the value is empty", () => {
        it("should have errors", () => {
          expect(formValidator.hasError()).toBeTruthy();
        });
      });
    });

    describe("when the value is an invalid number", () => {
      beforeEach(() => {
        const formData: FormDataTest = {
          field1: "something",
          field2: "a",
        };
        formValidator = new FormValidatorTest(formData);
        formValidator.validate();
      });

      it("should have errors", () => {
        expect(formValidator.hasError()).toBeTruthy();
      });
    });
  });

  describe("given valid data", () => {
    beforeEach(() => {
      const formData: FormDataTest = {
        field1: "something",
        field2: "123",
      };
      formValidator = new FormValidatorTest(formData);
      formValidator.validate();
    });

    it("should not have any errors", () => {
      expect(formValidator.hasError()).toBeFalsy();
    });
  });
});

class FormValidatorTest extends FormValidator<FormDataTest> {
  constructor(formData: any) {
    super(formData);
    this.rules = ({
      field1: [isEmpty],
      field2: [isEmpty, isNumber],
    });
  }
}

interface FormDataTest {
  field1: string;
  field2: string;
}
