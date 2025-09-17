import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.js'; // Assuming you create this file
import { updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Route for updating the profile picture
router.post(
    '/update-pfp',
    protectRoute,
    upload.single('profilePic'),
    updateProfile
);

export default router;