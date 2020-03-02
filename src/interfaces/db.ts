/*
*
*  Interfaces for DB functionality
*
*/


export interface Post {
    id: number,
    title: string,
    content: string,
    user_id?: number,
    username?: string,
}

export interface Comment {
    id: number,
    content: string,
    user_id?: number,
    username?: string,
    post_id?: number,
}

export interface DbResult {
   data: Array<{}>,
}

export interface MessageResult {
    message: string,
}

