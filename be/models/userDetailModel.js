const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    skills: [
      {
        type: String,
        default: "",
      },
    ],
    resume: {
      type: String,
      default: "",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    present_company: {
      type: String,
      default: "",
    },
    current_role: {
      type: String,
      default: "",
    },
    previous_role: {
      type: String,
      default: "",
    },
    current_working_location: {
      type: String,
      default: "",
    },
    previous_working_location: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    graduation_year: {
      type: Number,
    },
    degree: {
      type: String,
      default: "",
    },
    location: {
      country: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
    },
    socialLinks: {
      linkedIn: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      portfolioWebsite: {
        type: String,
        default: "",
      },
      personalBlog: {
        type: String,
        default: "",
      },
    },
    experience: [
      {
        company: {
          type: String,
          default: "",
        },
        role: {
          type: String,
          default: "",
        },
        location: {
          type: String,
          default: "",
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: [Date, String],
        },
      },
    ],
  },
  { timestamps: true }
);

const userDetail = mongoose.model("UserInfo", userProfileSchema);
module.exports = userDetail;
