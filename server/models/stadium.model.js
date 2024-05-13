import mongoose from "mongoose";

const StadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required
    },
    location: {
        type: String,
        required
    },
});

const Stadium = mongoose.model('Stadium', StadiumSchema);
export default Stadium;