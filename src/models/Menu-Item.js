import mongoose from "mongoose";


const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

export default mongoose.model("MenuItem", menuItemSchema);