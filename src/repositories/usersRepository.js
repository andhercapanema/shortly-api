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
    sumUrlVisitsCountByUserId: async (id) => {
        const user = await connectionDB.query(
            `SELECT
                us.id,
                us.name,
                COALESCE(
                    SUM(ur.visits_count),
                    0
                ) AS "visitCount"
            FROM users AS us
            LEFT JOIN urls AS ur
            ON us.id = ur.user_id
            WHERE us.id = $1
            GROUP BY us.id, us.name;`,
            [id]
        );
        return user.rows[0];
    },
    selectMostVisitedUsers: async () => {
        const mostVisitedUrls = await connectionDB.query(
            `SELECT 
                us.id,
                us.name,
                COUNT(ur.id) AS "linksCount",
                COALESCE(
                    SUM(ur.visits_count),
                    0
                ) AS "visitCount"
            FROM users AS us
            LEFT JOIN urls AS ur
            ON us.id = ur.user_id
            GROUP BY us.id
            ORDER BY "visitCount" DESC
            LIMIT 10;`
        );
        return mostVisitedUrls.rows;
    },
};

export default UsersRepository;
