import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle optional profile photo
    let profilePhotoUrl = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl, // Will be null if no file was uploaded
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Corrected from httpsOnly to httpOnly
        secure: process.env.NODE_ENV === "production", // Added secure flag for production
        sameSite: "lax", // Changed from 'strict' to 'lax' for better cross-site compatibility
        domain: process.env.NODE_ENV === "production" ? ".abhix.io" : undefined, // Optional: set domain in production
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;

//     const file = req.file;
//     // cloudinary ayega idhar
//     const fileUri = getDataUri(file);
//     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",");
//     }
//     const userId = req.id; // middleware authentication
//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }
//     // updating data
//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;

//     // resume comes later here...
//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
//       user.profile.resumeOriginalName = file.originalname; // Save the original file name
//     }

//     await user.save();

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const files = req.files; // We'll need to handle multiple files

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Handle resume upload
    if (files?.resume) {
      const resumeUri = getDataUri(files.resume[0]);
      const resumeResponse = await cloudinary.uploader.upload(
        resumeUri.content
      );
      user.profile.resume = resumeResponse.secure_url;
      user.profile.resumeOriginalName = files.resume[0].originalname;
    }

    // Handle profile picture upload
    if (files?.profile) {
      const profileUri = getDataUri(files.profile[0]);
      const profileResponse = await cloudinary.uploader.upload(
        profileUri.content
      );
      user.profile.profilePhoto = profileResponse.secure_url;
    }

    // Update other fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getUserByID = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameters: id.",
        success: false,
      });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please check the userID.",
        success: false,
      });
    }

    return res.status(200).json({
      message: `User profile: ${user.fullname}`,
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the user.",
      error: error.message,
      success: false,
    });
  }
};
