const mongoose = require("mongoose");

const adSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add text"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price Eur"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);
