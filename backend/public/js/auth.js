// const API = "http://localhost:5000/api";

const API = window.location.hostname.includes("localhost")
    ? "http://localhost:5000/api"
    : "https://job-board-gugi.onrender.com/api";

document.addEventListener("submit", async (e) => {
    if (e.target.id === "loginForm" || e.target.id === "registerForm") {
        e.preventDefault();
        if (e.target.id === "loginForm") {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                const res = await fetch(`${API}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "index.html";
                } else alert(data.message || "Login failed");
            } catch (err) { alert("Server error"); }
        } else {
            // register form
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                const res = await fetch(`${API}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "index.html";
                } else alert(data.message || "Register failed");
            } catch (err) { alert("Server error"); }
        }
    }
});
