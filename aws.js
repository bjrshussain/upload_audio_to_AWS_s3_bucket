const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_access_key,
})

const uploadAudio = (filename, bucketname, file) => {

    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Location)
            }
        })
    })
}

module.exports = uploadAudio

