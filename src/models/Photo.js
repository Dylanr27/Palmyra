import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    alt: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

export default mongoose.model("Photo", photoSchema);