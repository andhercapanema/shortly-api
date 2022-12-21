import UrlsRepository from "../repositories/urlsRepository.js";

const { selectUrlById, selectUrlByShortUrl } = UrlsRepository;

export default async function urlExistsValidation(req, res, next) {
    const { id } = req.params;
    const { shortUrl } = req.params;
    let selectedUrl = {};

    if (id !== undefined) {
        selectedUrl = await selectUrlById(id);

        if (selectedUrl === undefined)
            return res.status(404).send({
                message:
                    "Nenhuma URL encurtada foi encontrada com esse id, favor inserir outro!",
            });
    } else if (shortUrl !== undefined) {
        selectedUrl = await selectUrlByShortUrl(shortUrl);

        if (selectedUrl === undefined)
            return res.status(404).send({
                message:
                    "Não existe nenhuma URL cadastrada com esse código, favor inserir outro!",
            });
    }

    res.locals.selectedUrl = selectedUrl;

    next();
}
