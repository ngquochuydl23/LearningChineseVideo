const mongoose = require('mongoose');
//const logger = require('../logger')

module.exports = {
    configureMongoDb() {
        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'learningChineseStorage'
            });

            mongoose.connection.on('connected', () => {

                var db = mongoose.connection.db;
                gfs = new mongoose.mongo.GridFSBucket(db, {
                    bucketName: "uploads"
                });

                resolve();
            });

            mongoose.connection.on('reconnected', () => {
                ///logger.info('Mongo has reconnected');
            });

            mongoose.connection.on('error', error => {
                //logger.error('Mongo connection has an error', error);
                mongoose.disconnect()
                reject()
            });

            mongoose.connection.on('disconnected', () => {
                //logger.info('Mongo connection is disconnected');
            });
        })
    },
    getGfs() {
        return new Promise((resolve, reject) => {
            var db = mongoose.connection.db;
            const gfs = new mongoose.mongo.GridFSBucket(db, {
                bucketName: "uploads"
            });

            if (!gfs) {

            }

            resolve(gfs);
        })
    }
}