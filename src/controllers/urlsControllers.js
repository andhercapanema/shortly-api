import { nanoid } from "nanoid";
import UrlsRepository from "../repositories/urlsRepository.js";
import UsersRepository from "../repositories/usersRepository.js";

const { insertNewUrl, increaseVisitsCount, deleteUrlFromDb } = UrlsRepository;

export async function shortenUrl(req, res) {
    const {
        session: { user_id },
    } = res.locals;
    let { url } = res.locals.validatedBody;
    const longUrl = url;
    url = nanoid();

    try {
        await insertNewUrl(user_id, url, longUrl);
        res.status(201).send({ shortUrl: url });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {
    const {
        selectedUrl: { id, short_url, url },
    } = res.locals;

    try {
        res.send({ id, shortUrl: short_url, url });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res) {
    const {
        selectedUrl: { id, url, visits_count },
    } = res.locals;

    try {
        await increaseVisitsCount(visits_count + 1, id);
        res.redirect(url);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;

    try {
        await deleteUrlFromDb(id);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export async function getMostVisitedUrls(req, res) {
    try {
        const mostVisitedUrls = await UsersRepository.selectMostVisitedUsers();
        res.send(mostVisitedUrls);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
