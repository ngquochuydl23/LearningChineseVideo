const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const app = express();
const _ = require('lodash');
const config = require('./config.json');
const PORT = config.port;
const { configureMongoDb } = require('./db')
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');

const storage = new GridFsStorage({
    url: process.env.MONGODB_CONNECTION_STRING,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err)
                    return reject(err);

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            })
        })
    }
});

const upload = multer({ storage: storage });

let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});


app.post("/storage-api/upload", upload.any(), async function (req, res) {
    if (req.fileValidationError) {
        return res.status(400).json({
            statusCode: 400,
            error: {
                message: req.fileValidationError,
            }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            statusCode: 400,
            error: {
                message: "No file uploaded"
            }
        })
    }
    const files = req.files;

    try {
        var medias = await Promise.all(_.map(files, async (file, index) => {
            return {
                url: config.serverUrl + file.filename,
                mime: file.mimetype,
                size: file.size,
            }
        }));

        return res.send({
            statusCode: res.statusCode,
            result: {
                medias
            }
        })


    } catch (error) {
        res.status(500)
        return res.send({
            statusCode: 400,
            error: {
                message: error.message
            }
        })
    }
});

app.get("/storage/:filename", async function (req, res) {
    try {
        const cursor = gfs.find({ filename: req.params.filename });
        const file = await cursor.toArray();

        if (!file.length)
            return res
                .status(500)
                .json({
                    statusCode: 500,
                    error: {
                        message: "Not a file"
                    }
                });

        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (error) {

        res.status(500)
        return res.send({
            statusCode: 400,
            error: {
                message: error.message
            }
        })
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(PORT, () => {
    configureMongoDb();
    console.log(`App is listening on port ${PORT}.`)
});