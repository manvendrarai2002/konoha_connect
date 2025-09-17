import multer from 'multer';

// This configures multer to process the file in your server's memory.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;