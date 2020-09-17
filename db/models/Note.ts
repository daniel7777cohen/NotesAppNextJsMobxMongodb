import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [16, `Title's length cant exceed 16 characters!`],
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

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
