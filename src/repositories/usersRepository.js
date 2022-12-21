import connectionDB from "../database/db.js";

const UsersRepository = {
    selectUserByEmail: async (email) => {
        const user = await connectionDB.query(
            `SELECT *
            FROM users
            WHERE email = $1;`,
            [email]
        );
        return user.rows[0];
    },
    insertNewUser: async ({ name, email, password }) => {
        await connectionDB.query(
            `INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3);`,
            [name, email, password]
        );
    },
    sumUrlVisitCountByUserId: async (id) => {
        const user = await connectionDB.query(
            `SELECT us.id, us.name, SUM(ur.visits_count) AS "visitCount"
            FROM users AS us
            JOIN urls AS ur
            ON us.id = ur.user_id
            WHERE us.id = $1
            GROUP BY us.id, us.name;`,
            [id]
        );
        return user.rows[0];
    },
};

export default UsersRepository;
