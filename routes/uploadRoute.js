const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
  productImg,
  blogImg,
} = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/product",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImg,
  uploadImages
);
router.post(
  "/blog",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImg,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
