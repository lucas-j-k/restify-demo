/*
*
*  Interfaces for HTTP - server, request/response etc...
*
*/


import { Request } from 'restify';

import DAO from '../db/dao';


// Extend Restify Request to allow attaching an open Database connection in the middleware
export interface RequestWithDatabase extends Request {
    DAO?: DAO,
}