import isFinite from "lodash.isfinite";
import { emailRegex, passwordRegex } from "./inputRegex";
import InvalidFieldError from "./InvalidFieldError";

export const isEmpty = (field: string, value: unknown): InvalidFieldError<any> | undefined => {
  if (typeof value !== "string") {
    throw new Error("isEmpty must be called on string");
  }

  if (!value) {
    return {
      field,
      error: `${field}_isEmpty`,
    };
  }
};

export const isEmail = (field: string, value: unknown): InvalidFieldError<any> | undefined => {
  if (typeof value !== "string") {
    throw new Error("isEmail must be called on string");
  }

  if (value && !(emailRegex.test(value))) {
    return {
      field,
      error: `${field}_isEmail`,
    };
  }
};

export const isPassword = (field: string, value: unknown): InvalidFieldError<any> | undefined => {
  if (typeof value !== "string") {
    throw new Error("isPassword must be called on string");
  }

  if (value && !(passwordRegex.test(value))) {
    return {
      field,
      error: `${field}_isPassword`,
    };
  }
};

export const isSame = (toCompare: unknown) => (field: string, value: unknown): InvalidFieldError<any> | undefined => {
  if (value !== toCompare) {
    return {
      field,
      error: `${field}_isSame_${field}`,
    };
  }
};

export const isNumber = (field: string, value: unknown): InvalidFieldError<any> | undefined => {
  if (value && !isFinite(Number(value))) {
    return {
      field,
      error: `${field}_isNumber`,
    };
  }
};

export const hasLength = (length: number) =>
  (field: string, value: unknown): InvalidFieldError<any> | undefined => {
    if (typeof value !== "string") {
      throw new Error("hasLength must be called on string");
    }

    if (value.length !== length) {
      return {
        field,
        error: `${field}_hasLength:${length}`,
      };
    }
  };

export const hasMinLength = (length: number) =>
  (field: string, value: unknown): InvalidFieldError<any> | undefined => {
    if (typeof value !== "string") {
      throw new Error("hasMinLength must be called on string");
    }

    if (value.length < length) {
      return {
        field,
        error: `${field}_hasMinLength:${length}`,
      };
    }
  };
