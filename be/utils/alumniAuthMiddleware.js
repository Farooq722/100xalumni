const userModel = require("../models/userModel");

const alumniAuthMiddleware = async (req, res, next) => {
    try {
        if (!req.id) {
            return res.status(401).json({
                msg: "Unauthorized: Missing user ID",
                success: false,
                error: true
            });
        }

        const user = await userModel.findById(req.id);
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
                error: true
            });
        }

        if (user.role !== "alumni") {
            return res.status(403).json({
                msg: "Forbidden: Only alumni can edit profile",
                success: false,
                error: true
            });
        }

        next(); 
    } catch (error) {
        return res.status(500).json({
            msg: error.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

module.exports = { alumniAuthMiddleware };
