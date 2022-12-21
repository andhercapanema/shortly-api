import SessionsRepository from "../repositories/sessionsRepository.js";

export default async function validateAuthorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

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

        res.locals.session = session;
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }

    next();
}
