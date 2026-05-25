import { WretchError } from "wretch/resolver";

// Types & Interfaces
type JSONable =
	| string | number | boolean | null | undefined
	| readonly JSONable[]
	| { readonly [key: string]: JSONable }
	| { toJSON(): JSONable };
type BaseErrorOptions = {
	cause?: Error;
	context?: JSONable;
	status?: number;
};
type HttpErrorOptions = Omit<BaseErrorOptions, "status">;

// Constants & Variables
export const ErrorMessage = Object.freeze({
	// 4xx
	BadRequest: "Bad request",
	Unauthorized: "Unauthorized",
	NotFound: "Not found",

	// 5xx
	InternalServer: "Internal server error",
});

export class BaseError extends Error {
	public readonly context?: JSONable;
	public status: number;

	constructor(
		message: string = ErrorMessage.InternalServer,
		options: BaseErrorOptions = {}
	) {
		const { cause, context, status } = options;

		super(message, { cause });
		this.name = new.target.name;
		this.context = context;
		this.status = status ?? 500;
	}
}

export class BadRequestError extends BaseError {
	constructor(
		message: string = ErrorMessage.BadRequest,
		options: HttpErrorOptions = {}
	) {
		super(message, { status: 400, ...options });
		this.name = new.target.name;
	}
}
export class UnauthorizedError extends BaseError {
	constructor(
		message: string = ErrorMessage.Unauthorized,
		options: HttpErrorOptions = {}
	) {
		super(message, { status: 401, ...options });
		this.name = new.target.name;
	}
}
export class NotFoundError extends BaseError {
	constructor(
		message: string = ErrorMessage.NotFound,
		options: HttpErrorOptions = {}
	) {
		super(message, { status: 404, ...options });
		this.name = new.target.name;
	}
}
export class InternalServerError extends BaseError {
	constructor(
		message: string = ErrorMessage.InternalServer,
		options: HttpErrorOptions = {}
	) {
		super(message, { status: 500, ...options });
		this.name = new.target.name;
	}
}

// # Error Handler
export function ensureError(value: unknown): BaseError {
	if (value instanceof BaseError) return value;
	if (value instanceof WretchError) {
		return new BaseError(value.message, {
			status: value.status,
			cause: value,
		});
	}
	if (value instanceof Error) return new InternalServerError(value.message, { cause: value });

	// Other Error
	let stringified = "[Unable to stringify the thrown value]";
	try {
		stringified = JSON.stringify(value);
	} catch { }

	const error = new BaseError(`This value was thrown as is, not through an Error: ${stringified}`);
	return error;
}