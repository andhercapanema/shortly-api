import SessionsRepository from "../repositories/sessionsRepository.js";
import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urlsRepository.js";

const {
    insertNewUrl,
    selectUrlById,
    selectUrlByShortUrl,
    increaseVisitsCount,
} = UrlsRepository;

export async function shortenUrl(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    let { url } = res.locals.validatedBody;

    if (token === undefined)
        return res
            .status(401)
            .send({ message: "Authorization header não enviado!" });

    try {
        const session = await SessionsRepository.selectSessionByToken(token);

        if (session === undefined)
            return res.status(401).send({
                message:
                    "Authorization header enviado não corresponde a nenhum usuário logado!",
            });

        const longUrl = url;
        url = nanoid();

        await insertNewUrl(session.user_id, url, longUrl);

        res.status(201).send({ shortUrl: url });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {
    const { id } = res.locals;

    try {
        const shortUrl = await selectUrlById(id);

        if (shortUrl === undefined)
            return res.status(404).send({
                message:
                    "Nenhuma URL encurtada foi encontrada com esse id, favor inserir outro!",
            });

        res.send(shortUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const selectedUrl = await selectUrlByShortUrl(shortUrl);

        if (selectedUrl === undefined)
            return res.status(404).send({
                message:
                    "Não existe nenhuma URL cadastrada com esse código, favor inserir outro!",
            });

        const { id, url, visits_count } = selectedUrl;

        await increaseVisitsCount(visits_count + 1, id);

        res.redirect(url);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
