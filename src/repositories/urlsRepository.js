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
};

export default UrlsRepository;
