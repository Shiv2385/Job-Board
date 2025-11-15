import Job from "../models/Job.js";


export const createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, owner: req.user._id });
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getJobs = async (req, res) => {
    try {
        const { q, company, location } = req.query;
        const filter = {};

        if (q) filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } }
        ];
        if (company) filter.company = { $regex: company, $options: "i" };
        if (location) filter.location = { $regex: location, $options: "i" };

        const jobs = await Job.find(filter).sort({ createdAt: -1 }).populate("owner", "name email");
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("owner", "name email");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.owner && job.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        Object.assign(job, req.body);
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.owner && job.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await job.deleteOne();
        // await job.remove();
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
