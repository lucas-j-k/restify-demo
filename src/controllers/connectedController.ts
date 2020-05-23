/*
*
* Connected controller - base controller initialised with an open DB connection
*
*/

import DAO from '../db/dao';

abstract class ConnectedController {
    protected DAO;

    constructor(dao) {
        this.DAO = dao;
    }
}

export default ConnectedController;