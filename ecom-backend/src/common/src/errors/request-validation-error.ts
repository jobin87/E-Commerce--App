import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
  return this.errors.map((error) => {
    if ('param' in error && typeof error.param === 'string') {
      return {
        message: String(error.msg),
        field: error.param,
      };
    }

    return {
      message: String(error.msg),
      // No 'field' key here — makes it optional
    };
  });
}

}
