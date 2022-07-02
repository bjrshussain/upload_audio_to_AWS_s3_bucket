require('dotenv').config()
const express = require('express');
const multer = require('multer');
const { memoryStorage } = require('multer')
const storage = memoryStorage()
const upload = multer({ storage })
const uploadAudio = require('./aws')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// uplaods post route. posts to s3 bucket
app.post('/upload', upload.single('audiofile'), async (req, res) => {
    const filename = 'hussainhussain';
    const bucketname = 'octoberbuokett';
    const file = req.file.buffer
    // link is the returned object URL from S3
    const link = await uploadAudio(filename, bucketname, file)
    res.send(link)
})

app.listen(8000, () => {
    console.log('serving on 8000')
})
