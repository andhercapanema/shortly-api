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
};

export default UsersRepository;
