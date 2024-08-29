import { StatusCodes } from "http-status-codes";

// NotFoundError extends Error:
export class NotFoundError extends Error{
    constructor(message){
        super(message)
        this.name = 'NotFoundError';
        this.statusCodes = StatusCodes.NOT_FOUND;
        
    }
}

// BadRequestError extends Error:
export class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.name = 'BadRequestError';
        this.statusCodes = StatusCodes.BAD_REQUEST;
    }
}

// UnauthenticatedError extends Error:
export class UnauthenticatedError extends Error{
    constructor(message){
        super(message)
        this.name = 'UnauthenticatedError';
        this.statusCodes = StatusCodes.UNAUTHORIZED;
    }
}

// UnauthorizedError extends Error:
export class UnauthorizedError extends Error{
    constructor(message){
        super(message)
        this.name = 'UnauthorizedError';
        this.statusCodes = StatusCodes.FORBIDDEN;
    }
}