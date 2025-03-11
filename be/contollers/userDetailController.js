const userModel = require("../models/userModel");
const userDetailModel = require("../models/userDetailModel");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

// const userDetails = async (req, res) => {
//   try {
//     const userId = req.id;

//     const {
//       bio,
//       skills,
//       present_company,
//       current_role,
//       previous_role,
//       current_working_location,
//       previous_working_location,
//       email,
//       phoneNumber,
//       graduation_year,
//       degree,
//       location,
//       // experience,
//     } = req.body;

//     const socialLinks = {
//       linkedIn: req.body.linkedin || req.body.linkedIn || "",
//       github: req.body.github || "",
//       twitter: req.body.twitter || "",
//       portfolioWebsite: req.body.portfoliowebsite || req.body.portfolioWebsite || "",
//       personalBlog: req.body.personalblog || req.body.personalBlog || "",
//     };

//     let profilePhotoUrl = null;
//     let resumeUrl = null;

//     if (req.files?.profilePhoto?.[0]) {
//       const profilePhotoFile = getDataUri(req.files.profilePhoto[0]);
//       const profilePhotoResponse = await cloudinary.uploader.upload(profilePhotoFile.content, {
//         folder: "profile_photos",
//       });
//       profilePhotoUrl = profilePhotoResponse.secure_url;
//     }

//     if (req.files?.resume?.[0]) {
//       const resumeFile = getDataUri(req.files.resume[0]);
//       const resumeResponse = await cloudinary.uploader.upload(resumeFile.content, {
//         folder: "resume",
//         resource_type: "raw",
//         format: "pdf",
//       });
//       resumeUrl = resumeResponse.secure_url;
//     }

//     const user = await userModel.findById(userId);
//     if (!user || user.role !== "alumni") {
//       return res.status(403).json({
//         msg: "Unauthorized: Only alumni can update details",
//         success: false,
//       });
//     }

//     let userDetail = await userDetailModel.findOne({ userId });

//     if (!userDetail) {
//       userDetail = new userDetailModel({ userId, email: user.email });
//     }

//     if (bio) userDetail.bio = bio;
//     if (skills) userDetail.skills = skills;
//     if (present_company) userDetail.present_company = present_company;
//     if (current_role) userDetail.current_role = current_role;
//     if (previous_role) userDetail.previous_role = previous_role;
//     if (current_working_location) userDetail.current_working_location = current_working_location;
//     if (previous_working_location) userDetail.previous_working_location = previous_working_location;
//     if (email) userDetail.email = email;
//     if (phoneNumber) userDetail.phoneNumber = phoneNumber;
//     if (graduation_year) userDetail.graduation_year = graduation_year;
//     if (degree) userDetail.degree = degree;
//     if (profilePhotoUrl) userDetail.profilePhoto = profilePhotoUrl;
//     if (resumeUrl) userDetail.resume = resumeUrl;

//     if (location) {
//       userDetail.location = {
//         country: location.country || userDetail.location?.country,
//         state: location.state || userDetail.location?.state,
//         city: location.city || userDetail.location?.city,
//       };
//     }

//     userDetail.socialLinks = userDetail.socialLinks || {};

//     Object.keys(socialLinks).forEach((key) => {
//       if (socialLinks[key]) {
//         userDetail.socialLinks[key] = socialLinks[key];
//       }
//     });

//     await userDetail.save();

//     return res.status(200).json({
//       msg: "User data updated successfully",
//       success: true,
//       error: false,
//       userDetail,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message || "Internal Server Error",
//       success: false,
//       error: true,
//     });
//   }
// };

const userDetails = async (req, res) => {
  try {
    const userId = req.id;

    const {
      bio,
      skills,
      present_company,
      current_role,
      // previous_role,
      // current_working_location,
      // previous_working_location,
      email,
      // phoneNumber,
      graduation_year,
      degree,
      experience,
    } = req.body;

    const socialLinks = {
      linkedIn: req.body.linkedin || req.body.linkedIn || "",
      github: req.body.github || "",
      twitter: req.body.twitter || "",
      portfolioWebsite:
        req.body.portfoliowebsite || req.body.portfolioWebsite || "",
      personalBlog: req.body.personalblog || req.body.personalBlog || "",
    };

    const location = {
      country: req.body.country || " ",
      state: req.body.state || " ",
    };

    let profilePhotoUrl = null;
    let resumeUrl = null;

    if (req.files?.profilePhoto?.[0]) {
      const profilePhotoFile = getDataUri(req.files.profilePhoto[0]);
      const profilePhotoResponse = await cloudinary.uploader.upload(
        profilePhotoFile.content,
        {
          folder: "profile_photos",
        }
      );
      profilePhotoUrl = profilePhotoResponse.secure_url;
    }

    if (req.files?.resume?.[0]) {
      const resumeFile = getDataUri(req.files.resume[0]);
      const resumeResponse = await cloudinary.uploader.upload(
        resumeFile.content,
        {
          folder: "resume",
          resource_type: "raw",
          format: "pdf",
        }
      );
      resumeUrl = resumeResponse.secure_url;
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== "alumni") {
      return res.status(403).json({
        msg: "Unauthorized: Only alumni can update details",
        success: false,
        error: true,
      });
    }

    let userDetail = await userDetailModel.findOne({ userId });

    if (!userDetail) {
      userDetail = new userDetailModel({ userId, email: user.email });
    }

    // Preserve existing values if no new values are provided
    const fieldsToUpdate = {
      bio,
      skills,
      present_company,
      current_role,
      // previous_role,
      // current_working_location,
      // previous_working_location,
      email,
      // phoneNumber,
      graduation_year,
      degree,
      location,
      experience,
      profilePhoto: profilePhotoUrl || userDetail.profilePhoto,
      resume: resumeUrl || userDetail.resume,
    };

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      if (value !== undefined && value !== null && value !== "") {
        userDetail[key] = value;
      }
    }

    if (location) {
      userDetail.location = userDetail.location || {};
      userDetail.location.country =
        location.country || userDetail.location.country;
      userDetail.location.state = location.state || userDetail.location.state;
    }

    userDetail.socialLinks = userDetail.socialLinks || {};
    Object.keys(socialLinks).forEach((key) => {
      if (socialLinks[key]) {
        userDetail.socialLinks[key] = socialLinks[key];
      }
    });

    await userDetail.save();

    return res.status(200).json({
      msg: "User data updated successfully",
      success: true,
      error: false,
      userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

// const getUserDetail = async (req, res) => {
//   try {

//     const user = await userDetailModel.find();
//     console.log(user);

//     if(!user || user.length == 0) {
//       return res.status(404).json({
//         msg: "No user found",
//         success: false,
//         error: true
//       });
//     }

//     return res.status(200).json({
//       msg: "User Details",
//       success: true,
//       error: false,
//       user,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       msg: error.message || "Intenal error",
//       error: true,
//       sucess: false
//     })
//   }
// }
const getUserDetail = async (req, res) => {
  try {
    const users = await userDetailModel
      .find()
      .select("-password -refresh_token");

    if (!users || users.length === 0) {
      return res.status(404).json({
        msg: "No user found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      msg: "User Details",
      success: true,
      error: false,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = {
  userDetails,
  getUserDetail,
};
