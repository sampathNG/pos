const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../products"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
      fs.unlinkSync(`public/images/blogs/${file.filename}`);
    })
  );
  next();
};
const productImg = async (req, res, next) => {
  const fss = require("fs").promises;
  const files = await fss.readdir(path.join(__dirname, "../products"));
  if (files.length == 0) return next();
  await Promise.all(
    files.map(async (file) => {
      const sharpFolder = path.join(__dirname, "../products", file);
      const outputFolder = path.join(__dirname, "../product", file);
      await sharp(sharpFolder)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputFolder);
    })
  );
  next();
};
const blogImg = async (req, res, next) => {
  const fss = require("fs").promises;
  const files = await fss.readdir(path.join(__dirname, "../products"));
  if (files.length == 0) return next();
  await Promise.all(
    files.map(async (file) => {
      const sharpFolder = path.join(__dirname, "../products", file);
      const outputFolder = path.join(__dirname, "../blog", file);
      await sharp(sharpFolder)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputFolder);
    })
  );
  next();
};
module.exports = {
  uploadPhoto,
  productImgResize,
  productImg,
  blogImgResize,
  blogImg,
};
