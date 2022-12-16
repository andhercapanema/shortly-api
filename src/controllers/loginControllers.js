import UsersRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";
import SessionsRepository from "../repositories/sessionsRepository.js";
import { v4 as uuid } from "uuid";

const { getUserByEmail, insertNewUser } = UsersRepository;
const { insertNewSession, getSessionByUserId, deleteSessionByUserId } =
    SessionsRepository;

export async function signUp(req, res) {
    const signUpData = res.locals.validatedBody;
    const { email, password, confirmPassword } = signUpData;

    if (password !== confirmPassword)
        return res
            .status(422)
            .send({ message: "As senhas inseridas são diferentes!" });

    try {
        const isNewEmail = (await getUserByEmail(email)) === undefined;

        if (!isNewEmail)
            return res.status(409).send({
                message:
                    "Esse e-mail já está cadastrado, favor inserir outro ou realizar login!",
            });

        const hashedSignUpData = {
            ...signUpData,
            password: bcrypt.hashSync(password, 10),
        };
        await insertNewUser(hashedSignUpData);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = res.locals.validatedBody;

    try {
        const user = await getUserByEmail(email);

        if (user === undefined || !bcrypt.compareSync(password, user.password))
            return res.status(401).send({
                message:
                    "Nenhum usuário está cadastrado com esse e-mail ou a senha inserida está incorreta!",
            });

        /* const session = await getSessionByUserId(user.id);
        if (session !== undefined) await deleteSessionByUserId(user.id); */

        await deleteSessionByUserId(user.id);

        const token = uuid();
        await insertNewSession(user.id, token);
        res.status(200).send(token);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}
