const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `./uploads`
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err)

            const filename = buf.toString('hex') + path.extname(file.originalname);
            return cb(null, filename)
        })
    }
})

var upload = multer({ storage: storage })

app.post('/storage-api/upload', upload.any(), (req, res, next) => {
    const files = req.files;
    console.log(files);
    if (!files) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    var result = files.map((file) => ({
        size: file.size,
        url: "/storage/" + file.mimetype.split("/")[0] + "/" + file.filename,
        mimetype: file.mimetype,
        filename: file.originalname
    }))

    return res.status(200).send({
        statusCode: 200,
        result: {
            medias: result
        }
    });
})


app.get("/storage/:filetype/:filename", function (req, res) {

    const filetype = req.params.filetype;

    if (filetype !== 'video') {

        const videoPath = "./uploads/" + req.params.filename;
        var readStream = fs.createReadStream(videoPath);
        readStream.pipe(res);
    } else {


        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range header");
        }

        const videoPath = "./uploads/" + req.params.filename;
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    }
});

app.use(express.static(__dirname + "/views"));

app.listen(2601, function () {
    console.log("Listening on port 2601!");
});