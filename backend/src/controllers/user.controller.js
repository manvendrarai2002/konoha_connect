import User from '../models/user.model.js';
import { uploadToCloudinary } from '../lib/cloudinary.js'; // Assuming you create this file

export const updateProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded." });
    }

    // Upload the file to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(req.file.buffer, "profile-pics");

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: cloudinaryResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};