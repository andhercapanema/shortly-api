import UrlsRepository from "../repositories/urlsRepository.js";
import UsersRepository from "../repositories/usersRepository.js";

export default async function getMyUrls(req, res) {
    const {
        session: { user_id },
    } = res.locals;

    try {
        const userSumVisitsCount =
            await UsersRepository.sumUrlVisitsCountByUserId(user_id);

        if (userSumVisitsCount === undefined)
            return res.status(404).send({
                message:
                    "O usuário correspondente a esse token não existe mais!",
            });

        const userUrls = await UrlsRepository.selectUrlsInfosByUserId(user_id);

        res.send({
            ...userSumVisitsCount,
            shortenedUrls: [...userUrls],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
