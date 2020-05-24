/*
*
*	Response Objects
*
*/

import errs, { HttpError } from 'restify-errors';

export const buildSuccessResponse = (data?: []) => ({
	status: 200,
	data,
});


export const buildErrorResponse = (err: HttpError) => ({
	message: 'Error Occurred',
	error: err.body,
});

export const buildServerErrorResponse = () => {
	const err = new errs.InternalServerError('Internal Server Error');
	return {
		message: 'Error Occurred',
		error: err.body,
	};
}


export const buildError = (statusCode: number, errorMessage: string) => ({
	status: statusCode,
	error: {
		message: errorMessage,
	}
});



/*
*	Define Individual Errors
*/

export const errorResponses = {
	notFound: buildError(404, 'Resource not found'),
	badRequest: buildError(400, 'Bad request. Check query string parameters or request body'),
	internalServer: buildError(500, 'Internal server error'),
};