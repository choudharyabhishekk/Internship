import multer from "multer";

const storage = multer.memoryStorage();

// For single file upload (keep this if you need it elsewhere)
export const singleUpload = multer({ storage }).single("file");

// For multiple files with different field names
export const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profile", maxCount: 1 },
]);
