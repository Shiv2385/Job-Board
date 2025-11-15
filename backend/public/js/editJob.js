// const API = "http://localhost:5000/api";
const API = window.location.hostname.includes("localhost")
    ? "http://localhost:5000/api"
    : "https://job-board-gugi.onrender.com/api";


const params = new URLSearchParams(location.search);
const id = params.get("id");
const token = localStorage.getItem("token");
if (!token) { alert("Login required"); location.href = "login.html"; }

async function loadJob() {
    try {
        const res = await fetch(`${API}/jobs/${id}`);
        const job = await res.json();
        document.getElementById("title").value = job.title || "";
        document.getElementById("company").value = job.company || "";
        document.getElementById("location").value = job.location || "";
        document.getElementById("salary").value = job.salary || "";
        document.getElementById("description").value = job.description || "";
    } catch (err) { console.error(err); }
}

document.getElementById("editJobForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const jobData = {
        title: document.getElementById("title").value,
        company: document.getElementById("company").value,
        location: document.getElementById("location").value,
        salary: document.getElementById("salary").value,
        description: document.getElementById("description").value
    };

    try {
        const res = await fetch(`${API}/jobs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify(jobData)
        });
        if (res.ok) {
            alert("Job updated");
            location.href = "index.html";
        } else {
            const data = await res.json();
            alert(data.message || "Update failed");
        }
    } catch (err) { alert("Server error"); }
});

loadJob();
