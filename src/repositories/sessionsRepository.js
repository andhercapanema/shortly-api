import connectionDB from "../database/db.js";

const SessionsRepository = {
    insertNewSession: async (userId, token) => {
        await connectionDB.query(
            `INSERT INTO sessions
            (user_id, token)
            VALUES ($1, $2);`,
            [userId, token]
        );
    },
    getSessionByUserId: async (userId) => {
        const session = await connectionDB.query(
            `SELECT *
            FROM sessions
            WHERE user_id = $1;`,
            [userId]
        );
        return session.rows[0];
    },
    deleteSessionByUserId: async (userId) => {
        await connectionDB.query(
            `DELETE
            FROM sessions
            WHERE user_id = $1;`,
            [userId]
        );
    },
};

export default SessionsRepository;
