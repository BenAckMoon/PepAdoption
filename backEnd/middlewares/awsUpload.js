const uuid = require("uuid").v4;
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

 const S3PetUploadMiddleware = async (req, res, next) => {
  try {
    const file = req.file;
    const text = req.body.text;
    const petObject = JSON.parse(text);

    if (typeof file === "undefined") {
      req.petImage = null;
      next();
    }

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `uploads/${uuid()}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(s3Params).promise();
    req.petImage = data.Location;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports={S3PetUploadMiddleware} 