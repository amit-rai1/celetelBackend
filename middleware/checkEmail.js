import user from "../model/user";

export const checkEmail = async (req, res, next) => {


    const checked = await user.findOne({ email: req.body.email })

    if (!checked) {
        next();
    }
    else {
        res.send(
            {
                status: 200,
                message: "email is already registerd"
            }
        )
    }
}