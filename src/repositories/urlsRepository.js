import connectionDB from "../database/db.js";

const UrlsRepository = {
    insertNewUrl: async (userId, shortUrl, longUrl) => {
        await connectionDB.query(
            `INSERT INTO urls
            (user_id, short_url, long_url)
            VALUES ($1, $2, $3);`,
            [userId, shortUrl, longUrl]
        );
    },
    selectUrlById: async (id) => {
        const shortUrl = await connectionDB.query(
            `SELECT *
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
    deleteUrlFromDb: async (id) => {
        await connectionDB.query(
            `DELETE FROM urls
            WHERE id = $1;`,
            [id]
        );
    },
    selectUrlsInfosByUserId: async (userId) => {
        const urls = await connectionDB.query(
            `SELECT id, short_url AS "shortUrl", long_url AS url, visits_count AS "visitCount"
            FROM urls
            WHERE user_id = $1
            ORDER BY id;`,
            [userId]
        );
        return urls.rows;
    },
};

export default UrlsRepository;
