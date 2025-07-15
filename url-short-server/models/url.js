const mongoose = require("mongoose");

//Model schema setup
const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique:true
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
