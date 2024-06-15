function errorHandler (error, req, res, next) {
    console.log(error, "<<<<<<<<<<<<<<<<")
    if(error.name === "UNAUTHORIZED" || error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Email not found or password not matched"
        })
    } else if(error.name === "FORBIDDEN") {
        res.status(403).json({
            message: "You have no access"
        })
    } else if(error.name === "NOT_FOUND") {
        res.status(404).json({
            message: "Error not found"
        })
    } else if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        let message = error.errors.map(el => el.message)
        res.status(400).json({
            message
        })
    } else if(error.name === "EMAIL_PASSWORD_REQUIRED") {
        res.status(400).json({
            message: "Email and Password is required"
        })
    } else{
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = errorHandler