import connectionDB from "../database/db.js";

const UrlsRepository = {
    insertNewUrl: async (userId, shortUrl, longUrl) => {
        await connectionDB.query(
            `INSERT INTO urls
            (user_id, short_url, url)
            VALUES ($1, $2, $3);`,
            [userId, shortUrl, longUrl]
        );
    },
    selectUrlById: async (id) => {
        const shortUrl = await connectionDB.query(
            `SELECT id, short_url AS "shortUrl", url
            FROM urls
            WHERE id = $1;`,
            [id]
        );
        return shortUrl.rows[0];
    },
};

export default UrlsRepository;
