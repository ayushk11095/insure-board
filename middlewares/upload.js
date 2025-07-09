const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.xlsx' && ext !== '.csv') {
    const error = new Error('Only .xlsx or .csv files allowed');
    error.statusCode = 400;
    error.success = false;
    error.message = 'Unsupported file type. Only .xlsx or .csv allowed';
    
    return cb(error, false);

  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
