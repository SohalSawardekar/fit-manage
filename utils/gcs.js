import { Storage } from "@google-cloud/storage";
import path from "path";

// Path to your service account key
const serviceAccountKeyPath = path.join(
  process.cwd(),
  "config/keys/fit-manage-6e71b697aae2.json"
);

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: serviceAccountKeyPath,
  projectId: "your-project-id", // Replace with your project ID
});

// Reference your bucket
const bucketName = "your-bucket-name"; // Replace with your bucket name
const bucket = storage.bucket(bucketName);

export { bucket, storage };
