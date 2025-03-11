const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const userDetail = require("../models/userDetailModel");
const refreshToken = require("../utils/refreshToken");
const accessToken = require("../utils/accessToken");
// const sendEmail = require("../db/resend");
// const verificationEmail = require("../utils/verificationMail");

// const registerUser = async (req, res) => {
//     try {
//       const { fullName, email, password, role } = req.body;
//     //   console.log(req.body);

//       if (!fullName || !email || !password || !role) {
//         return res.status(400).json({
//           msg: "Enter all fields",
//           success: false,
//           error: true,
//         });
//       }

//       const user = await userModel.findOne({ email });
//       if (user) {
//         return res.status(409).json({
//           msg: "User already exists",
//           success: false,
//           error: true,
//         });
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hashPassword = await bcrypt.hash(password, salt);

//       const userData = {
//         fullName,
//         email,
//         password: hashPassword,
//         role,
//       };

//       const newUser = new userModel(userData);
//       const userCreated = await newUser.save();

//     //   const verifyEmail = `${process.env.FRONTEND_URL}/verify-email?code=${userCreated._id}`;
//     //   await sendEmail({
//     //     sendTo: email,
//     //     subject: "Verification email from 100xalumni",
//     //     html: verificationEmail({
//     //       name: fullName,
//     //       url: verifyEmail,
//     //     }),
//     //   });

//       const accessToken1 = await accessToken(userCreated._id);
//       const refreshToken1 = await refreshToken(userCreated._id);

//       const cookieOption = {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "None",
//       };

//       res.cookie("accessToken", accessToken1, cookieOption);
//       res.cookie("refreshToken", refreshToken1, cookieOption);

//       const safeUser = userCreated.toObject();
//       delete safeUser.password;
//       delete safeUser.refresh_token;

//       return res.status(200).json({
//         msg: "User created successfully",
//         success: true,
//         error: false,
//         accessToken: accessToken1,
//         user: safeUser,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         msg: error.message || "Internal Server Error",
//         success: false,
//         error: true,
//       });
//     }
//   };

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        msg: "Enter all fields",
        success: false,
        error: true,
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullName,
      email,
      password: hashPassword,
      role,
    });

    await newUser.save(); 

    let userProfile = null;

    if (role === "alumni") {
      userProfile = new userDetail({
        userId: newUser._id,
        email: newUser.email,
      });
      await userProfile.save();

      newUser.profile = userProfile._id;
      await newUser.save();
    } else {
      console.log(`Skipping profile creation for role: ${role}`);
    }

    const accessToken1 = await accessToken(newUser._id);
    const refreshToken1 = await refreshToken(newUser._id);

    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken1, cookieOption);
    res.cookie("refreshToken", refreshToken1, cookieOption);

    const safeUser = newUser.toObject();
    delete safeUser.password;
    delete safeUser.refresh_token;

    return res.status(200).json({
      msg: "User created successfully",
      success: true,
      error: false,
      accessToken: accessToken1,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

// const loginUser = async (req, res) => {
//     try {

//         const { email, password } = req.body;

//         if(!email || !password) {
//             return res.status(400).json({
//                 msg: "Fill required details",
//                 success: false,
//                 error: true
//             });
//         }

//         const userExits = await userModel.findOne({ email });
//         if(!userExits) {
//             return res.status(404).json({
//                 msg: "User not found",
//                 success: false,
//                 error: true,
//             });
//         }

//         const checkPassword = await bcrypt.compare(password, userExits.password);
//         if(!checkPassword) {
//             return res.status(404).json({
//                 msg: "Invalid Password",
//                 success: false,
//                 error: true
//             });
//         }

//         const accessToken1 = await accessToken(userExits._id);
//         const refreshToken1 = await refreshToken(userExits._id);

//         const cookieOption = {
//             httpOnly: true,
//             secure: true,
//             sameSite: "None"
//         }
//         res.cookie('accessToken', accessToken1 , cookieOption)
//         res.cookie('refreshToken', refreshToken1 , cookieOption)

//         const safeUser = userExits.toObject();
//         delete safeUser.password;
//         delete safeUser.refresh_token;

//         return res.status(200).json({
//             msg: "User logged in successfully",
//             success: true,
//             error: false,
//             accessToken: accessToken1,
//             user: safeUser
//         });

//     } catch (error) {
//         return res.status(500).json({
//             msg: error.message || error || "Something went wrong",
//             success: false,
//             error: true
//         });
//     }
// }

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Fill required details",
        success: false,
        error: true,
      });
    }

    const userExits = await userModel.findOne({ email }).populate("profile");
    if (!userExits) {
      return res.status(404).json({
        msg: "User not found",
        success: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password, userExits.password);
    if (!checkPassword) {
      return res.status(404).json({
        msg: "Invalid Password",
        success: false,
        error: true,
      });
    }

    const accessToken1 = await accessToken(userExits._id);
    const refreshToken1 = await refreshToken(userExits._id);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken1, cookieOption);
    res.cookie("refreshToken", refreshToken1, cookieOption);

    const safeUser = userExits.toObject();
    delete safeUser.password;
    delete safeUser.refresh_token;

    return res.status(200).json({
      msg: "User logged in successfully",
      success: true,
      error: false,
      accessToken: accessToken1,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

// const logout = async (req, res) => {

//     try {

//         res.status(200).cookie("accessToken", "", {maxAge: 0}).json({
//             msg: "User logged out successfully",
//             success: true,
//             error: false
//         });

//     } catch (err) {
//         return res.status(500).json({
//             msg: err.message || err,
//             error: true,
//             success: false
//         })
//     }

// }

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });

    return res.status(200).json({
      msg: "User logged out successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

// const getAllUser = async (req, res) => {
//     try {
//       const allUsers = await userModel.find({ role: "alumni" });
//         if(!allUsers || allUsers.length == 0) {
//             return res.status(404).json({
//                 msg: "No user found",
//                 success: false,
//                 error: true
//             });
//         }

//         return res.status(200).json({
//             msg: "All users",
//             success: true,
//             error: false,
//             allUsers
//         });

//     } catch (error) {
//         return res.status(500).json({
//             msg: error.message || "Internal error",
//             success: false,
//             error: true
//         })
//     }
// }

const getAllUser = async (req, res) => {
  try {
    const allUsers = await userModel
      .find({ role: "alumni" })
      .select("-password -refresh_token")
      .populate("profile");

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        msg: "No user found",
        success: false,
        error: true,
      });
    }
  

    return res.status(200).json({
      msg: "All users fetched successfully",
      success: true,
      error: false,
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || "Internal error",
      success: false,
      error: true,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  getAllUser,
};
