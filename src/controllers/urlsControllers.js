import SessionsRepository from "../repositories/sessionsRepository.js";
import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urlsRepository.js";

export async function shortenUrl(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    let { url } = req.body;

    if (token === undefined)
        return res
            .status(401)
            .send({ message: "Authorization header não enviado!" });

    try {
        const session = await SessionsRepository.getSessionByToken(token);

        if (session === undefined)
            return res.status(401).send({
                message:
                    "Authorization header enviado não corresponde a nenhum usuário logado!",
            });

        const longUrl = url;
        url = nanoid();

        await UrlsRepository.insertNewUrl(session.user_id, url, longUrl);

        res.status(201).send({ shortUrl: url });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
