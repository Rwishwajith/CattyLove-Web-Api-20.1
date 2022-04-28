require("dotenv").config({ path: "./config.env" });

const jwt = require("jsonwebtoken");


generateAccessToken = (email, password) => {
    return jwt.sign(
        {
            email: email,
            password: password,
        },
        process.env.JWT_SECRET
    );
}

module.exports = {
    generateAccessToken
}