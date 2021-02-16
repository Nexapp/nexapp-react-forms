interface InvalidFieldError<Fields> {
  error: string;
  field: Fields;
}

export default InvalidFieldError;
