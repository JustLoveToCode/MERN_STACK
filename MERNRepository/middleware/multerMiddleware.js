// Provide the function for handling the File Upload
import multer from 'multer';

// This will configure the Disk Storage for Uploaded Files
// It specified where the Files should be stored and how they should be named
// It can be Memory or Disk Storage
const storage = multer.diskStorage({
    // Specified the Directory where the Uploaded Files should be stored
    // It is set to public/upload which mean that the files will be stored
    // in the public/upload Directory
    destination:(req, file, cb)=>{
        // The Filepath need to be correct which is pointing to
        // the public/upload Directory
        cb(null,'public/upload');
    },
        // This specified how the uploaded files should be named
        // it is set to use the Original Name of the File
    filename:(req, file, cb)=>{
        const fileName = file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({storage});

export default upload;