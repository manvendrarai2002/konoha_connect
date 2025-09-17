import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { uploadToCloudinary } from "../lib/cloudinary.js"; // Correct named import
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: senderId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: senderId },
			],
		}).sort({ createdAt: 1 }); // Sort messages by creation time

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { text } = req.body; // Only handles text
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		if (!text) return res.status(400).json({ error: "Text field is required" });

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
		});

		await newMessage.save();

		// Socket.IO logic to send message in real-time
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// New function to handle image and voice messages
export const sendMediaMessage = async (req, res) => {
	try {
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded." });
		}
		
		// Determine the folder based on file type
		const isImage = req.file.mimetype.startsWith("image");
		const folder = isImage ? "chat-images" : "voice-messages";
		
		const cloudinaryResponse = await uploadToCloudinary(req.file.buffer, folder);

		const messageData = {
			senderId,
			receiverId,
			// Save the appropriate URL based on the file type
			...(isImage ? { image: cloudinaryResponse.secure_url } : { voiceUrl: cloudinaryResponse.secure_url }),
		};

		const newMessage = new Message(messageData);

		await newMessage.save();

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMediaMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};