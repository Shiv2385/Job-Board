document.getElementById("postJobForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const jobData = {
        title: document.getElementById("title").value,
        company: document.getElementById("company").value,
        location: document.getElementById("location").value,
        salary: document.getElementById("salary").value,
        description: document.getElementById("description").value
    };

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify(jobData)
        });

        if (response.ok) {
            alert("Job posted successfully!");
            window.location.href = "index.html";
        } else {
            const err = await response.json();
            alert(err.message || "Failed to post job.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to post job.");
    }
});
