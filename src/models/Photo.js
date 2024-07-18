import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    alt: { type: String, required: true },
    url: { type: String, required: true },
    group: { type: String, required: true },
    gridOrder: { type: Number, required: true, default: 0 }
});

// Add a unique compound index on group and order
photoSchema.index({ group: 1, gridOrder: 1 }, { unique: true });

export default mongoose.model("Photo", photoSchema);