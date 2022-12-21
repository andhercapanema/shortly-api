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
    selectUrlByShortUrl: async (shortUrl) => {
        const url = await connectionDB.query(
            `SELECT *
            FROM urls
            WHERE short_url = $1;`,
            [shortUrl]
        );
        return url.rows[0];
    },
    increaseVisitsCount: async (amount, id) => {
        await connectionDB.query(
            `UPDATE urls
            SET visits_count = $1
            WHERE id = $2;`,
            [amount, id]
        );
    },
};

export default UrlsRepository;
