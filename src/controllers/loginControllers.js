import UsersRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";

const { getUserByEmail, insertNewUser } = UsersRepository;

export async function signUp(req, res) {
    const { signUpData } = res.locals;
    const hashedSignUpData = {
        ...signUpData,
        password: bcrypt.hashSync(signUpData.password, 10),
    };

    try {
        const isNewEmail =
            (await getUserByEmail(signUpData.email)) === undefined;

        if (!isNewEmail)
            return res.status(409).send({
                message:
                    "Esse e-mail já está cadastrado, favor inserir outro ou realizar login!",
            });

        await insertNewUser(hashedSignUpData);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
