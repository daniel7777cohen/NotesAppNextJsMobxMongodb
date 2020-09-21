import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    note_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      maxlength: [300, `Description's length cant exceed 300 characters!`],
    },
    checked: {
      type: Boolean,
      required: [true, "please make sure request contains checked property"],
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },

    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
