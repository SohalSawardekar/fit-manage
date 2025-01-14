import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Disable default body parsing for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

// API route handler
const handler = (req, res) => {
  if (req.method === "POST") {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res
          .status(500)
          .json({ message: "File upload failed", error: err.message });
      }

      // Respond with the file URL
      const fileUrl = `/uploads/${req.file.filename}`;
      res
        .status(200)
        .json({ message: "File uploaded successfully", url: fileUrl });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
