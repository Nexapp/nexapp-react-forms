import InvalidFieldError from "./InvalidFieldError";

export default interface ValidatorRules {
  [key: string]: ((field: string, value: unknown) => InvalidFieldError<any> | undefined)[];
}
