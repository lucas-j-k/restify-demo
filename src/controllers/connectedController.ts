/*
*
* Connected controller - base controller initialised with an open DB connection
*
*/

import DAO from '../db/dao';

abstract class ConnectedController {
    protected DAO : DAO;

    constructor(dao: DAO) {
        this.DAO = dao;
    }
}

export default ConnectedController;