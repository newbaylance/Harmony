const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/")

const authentication = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw { name: "UNAUTHORIZED" }
        }

        const token = req.headers.authorization.split(" ")[1]

        const payload = verifyToken(token)
        // console.log(payload, "<------------")

        const user = await User.findByPk(payload.id)

        if(!user) {
            throw { name: "UNAUTHORIZED" }
        }

        // console.log(user, "<---------user")

        req.user = {
            id: user.id
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = authentication