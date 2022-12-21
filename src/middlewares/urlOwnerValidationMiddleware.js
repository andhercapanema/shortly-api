export default async function urlOwnerValidation(req, res, next) {
    const { user_id: userIdSession } = res.locals.session;
    const { user_id: userIdSelectedUrl } = res.locals.selectedUrl;

    if (userIdSession !== userIdSelectedUrl)
        return res
            .status(401)
            .send({
                message:
                    "Você pode apagar apenas suas URLs, essa URL é de outro usuário!",
            });

    next();
}
