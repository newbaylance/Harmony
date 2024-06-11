const bcrypt = require("bcryptjs")

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

const comparedPassword = (password, hashPassword) => {
    const compared = bcrypt.compareSync(password, hashPassword)

    return compared
}

module.exports = { hashPassword, comparedPassword }