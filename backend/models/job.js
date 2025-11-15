import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        salary: { type: String },
        description: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);