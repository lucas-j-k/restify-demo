/*
*
*	Standard Response Objects
*
*/

import errs from 'restify-errors';

/*
*	Build a successful server response object, including any fetched DB rows
*/
export const buildSuccessResponse = (data?: []) => ({
	status: 200,
	data,
});


/*
*	Build an error server response
*/
const buildError = (status: number, message: string) => ({
	status: status,
	error: {
		message: message,
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