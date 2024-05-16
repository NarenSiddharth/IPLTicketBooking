import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);   
export default Transaction;