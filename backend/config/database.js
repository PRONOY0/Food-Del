const mongoose = require('mongoose');

exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.db_uri);
        console.log(`Successfully connected`);
    } catch (error) {
        console.log("Failed to connect to db due to ",error);
        process.exit(1);
    }
}