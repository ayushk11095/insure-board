const { Worker } = require('worker_threads');
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');
const xlsx = require('xlsx');

const User = require('../models/User');
const Policy = require('../models/Policy');
require('../models/Account');
require('../models/Carrier');
require('../models/Agent');
require('../models/LOB'); 

exports.handleUpload = async (req) => {
  return new Promise((resolve, reject) => {
    if (!req.file || !req.file.path) {
      return resolve({
        success: false,
        message: 'No file uploaded or file path missing',
        statusCode: 400
      });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const results = [];

    if (ext === '.csv') {
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => handleWorker(results, req.file.path, resolve));
    } else if (ext === '.xlsx') {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);

      results.push(...jsonData);
      handleWorker(results, req.file.path, resolve);
    } else {
      fs.unlinkSync(req.file.path);
      return resolve({
        success: false,
        message: 'Unsupported file format',
        statusCode: 400
      });
    }
  });
};

exports.searchPolicyByUsername = async (name) => {
  try {
    if (!name) {
      return {
        success: false,
        message: "Name is required",
        statusCode: 400
      };
    }

    const user = await User.findOne({ firstName: name });
    if (!user) {
      return {
        success: false,
        message: "User not found",
        statusCode: 404
      };
    }

    const policies = await Policy.find({ user: user._id })
      .populate("user")
      .populate("category")
      .populate("company")
      .populate("account");

    return {
      success: true,
      message: "Policies fetched successfully",
      data: policies,
      statusCode: 200
    };
  } catch (err) {
    return {
      success: false,
      message: "Service error",
      error: err.message,
      statusCode: 500
    };
  }
};

exports.getUserPolicyStats = async () => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: "$user",
          totalPolicies: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 0,
          userId: "$userInfo._id",
          name: "$userInfo.firstName",
          email: "$userInfo.email",
          totalPolicies: 1
        }
      }
    ]);

    return {
      success: true,
      message: "User policy stats fetched successfully",
      data: result,
      statusCode: 200
    };
  } catch (err) {
    return {
      success: false,
      message: "Service error",
      error: err.message,
      statusCode: 500
    };
  }
};

function handleWorker(data, filePath, resolve) {
  const worker = new Worker(path.resolve(__dirname, '../workers/uploadWorker.js'), {
    workerData: data,
  });

  worker.on('message', (msg) => {
    fs.unlinkSync(filePath);
    if (msg.status === 'success') {
      resolve({
        success: true,
        message: 'Worker completed successfully',
        statusCode: 200
      });
    } else {
      resolve({
        success: false,
        message: 'Worker failed to complete',
        error: msg.error,
        statusCode: 500
      });
    }
  });

  worker.on('error', (err) => {
    fs.unlinkSync(filePath);
    resolve({
      success: false,
      message: 'Worker encountered an error',
      error: err.message,
      statusCode: 500
    });
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      fs.unlinkSync(filePath);
      resolve({
        success: false,
        message: `Worker exited with code ${code}`,
        statusCode: 500
      });
    }
  });
}