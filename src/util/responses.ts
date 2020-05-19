/*
*
*	Response Objects
*
*/

import errs, { HttpError } from 'restify-errors';

export const buildSuccessResponse = (data?: []) => ({
	data,
	message: 'Success',
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

