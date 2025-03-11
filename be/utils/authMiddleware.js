const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized: Token missing or invalid",
                success: false,
                error: true
            });
        }

        let checkToken;
        try {
            checkToken = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
        } catch (err) {
            return res.status(401).json({
                msg: "Unauthorized: Invalid or expired token",
                success: false,
                error: true
            });
        }

        const user = await userModel.findById(checkToken.id);
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
                error: true
            });
        }

        // if (user.role !== "alumni") {
        //     return res.status(403).json({
        //         msg: "Forbidden: Only alumni can edit profile",
        //         success: false,
        //         error: true
        //     });
        // }

        req.id = checkToken.id;
        next();
    } catch (error) {
        return res.status(500).json({
            msg: error.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

module.exports = { authMiddleware };
