const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    image: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);