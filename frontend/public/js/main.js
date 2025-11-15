const API = "https://job-board-gugi.onrender.com";

const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const filterCompany = document.getElementById("filterCompany");
const filterLocation = document.getElementById("filterLocation");
const searchBtn = document.getElementById("searchBtn");
const authLink = document.getElementById("authLink");
const logoutBtn = document.getElementById("logoutBtn");
const postBtn = document.getElementById("postBtn");

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

// UI auth state
if (token) {
    authLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
} else {
    authLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
}

logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.reload();
});


// ========== FIX 1 — Correct owner check ==========
function isOwnerOfJob(job) {
    if (!user || !job.owner) return false;

    const jobOwnerId = typeof job.owner === "object"
        ? job.owner._id
        : job.owner;

    return user.id === jobOwnerId;
}


// ========== LOAD JOBS ==========
async function loadJobs(q = "", company = "", location = "") {
    try {
        const params = new URLSearchParams({ q, company, location });

        const res = await fetch(`${API}/jobs?${params.toString()}`);
        const jobs = await res.json();
        jobList.innerHTML = "";

        jobs.forEach(job => {
            const owner = isOwnerOfJob(job);

            const card = document.createElement("div");
            card.className = "job-card";

            card.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Salary:</strong> ${job.salary || ""}</p>
                <p>${job.description}</p>
                <p class="posted">Posted by: ${job.owner?.name || "Unknown"}</p>

                <div class="job-actions"></div>
            `;

            const actions = card.querySelector(".job-actions");

            // FIX 2 — view/edit only for owner
            if (owner) {
                const viewBtn = document.createElement("a");
                viewBtn.href = `edit-job.html?id=${job._id}`;
                viewBtn.textContent = "Edit";
                viewBtn.className = "btn small";
                actions.appendChild(viewBtn);

                const delBtn = document.createElement("button");
                delBtn.textContent = "Delete";
                delBtn.className = "btn danger small";
                delBtn.addEventListener("click", () => deleteJob(job._id));
                actions.appendChild(delBtn);
            }

            jobList.appendChild(card);
        });

    } catch (err) {
        console.error(err);
    }
}


// ========== DELETE JOB ==========
async function deleteJob(id) {
    if (!confirm("Delete this job?")) return;

    try {
        const res = await fetch(`${API}/jobs/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        // console.log("Delete status:", res.status);
        // console.log("Delete response:", data);

        if (!res.ok) {
            alert(data.message || "Delete failed");
            return;
        }

        alert("Job deleted!");
        loadJobs(searchInput.value, filterCompany.value, filterLocation.value);

    } catch (err) {
        console.error("DELETE ERROR:", err);
        alert("Server error");
    }
}


// Search
searchBtn.addEventListener("click", () => {
    loadJobs(searchInput.value, filterCompany.value, filterLocation.value);
});

// First load
loadJobs();
