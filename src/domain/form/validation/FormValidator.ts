import type InvalidFieldError from "./InvalidFieldError";
import type ValidatorRules from "./ValidationRules";

abstract class FormValidator<Fields> {
  protected formData: Fields;
  public rules: ValidatorRules;
  public errors: InvalidFieldError<keyof Fields>[];

  constructor(formData: Fields) {
    this.formData = formData;
    this.errors = [];
    this.rules = {};
  }

  public validate = (): void => {
    this.errors = [];
    Object.entries(this.formData).map(([field, value]) => {
      this.rules[field].map((fn) => {
        const error = fn(field, value);
        if (error) {
          this.errors.push(error);
        }
      });
    });
  };

  public hasError = (): boolean => this.errors.length > 0;
}

export default FormValidator;
