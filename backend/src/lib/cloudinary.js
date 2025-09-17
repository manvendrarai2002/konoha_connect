import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { Readable } from "stream";

config(); // Load environment variables from .env file

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// This is the essential helper function that was missing
const uploadToCloudinary = (buffer, folder) => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{
				resource_type: "auto",
				folder: folder, // e.g., "profile-pics" or "voice-messages"
			},
			(error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			}
		);

		// Create a readable stream from the buffer and pipe it to Cloudinary's uploader
		Readable.from(buffer).pipe(stream);
	});
};

export { uploadToCloudinary };