const express = require("express");
const dotenv = require('dotenv');
const multer = require('multer');

const connectDB = require('./utils/db');
const policyRoutes = require('./routes/policyRoutes');
const schedulerRoutes = require('./routes/schedulerRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/policy', policyRoutes);
app.use('/api/scheduler', schedulerRoutes);

// Error handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message.includes('Only .xlsx or .csv files allowed')) {
        return res.status(err.statusCode || 400).json({
            success: false,
            message: err.message || 'File upload error',
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

app.get("/", (req, res) => {
    res.send('Server is running...');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});