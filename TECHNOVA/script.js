document.addEventListener("DOMContentLoaded", function () {
    const clock = document.getElementById("clock");
    if (clock) {
        function updateClock() {
            const now = new Date();
            clock.innerHTML = now.toLocaleString();
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    let registrations = [];
    const regForm = document.getElementById("registrationForm");
    if (regForm) {
        regForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("studentName").value.trim();
            const email = document.getElementById("email").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const regNo = document.getElementById("regNumber").value.trim();
            const event = document.getElementById("eventSelect").value;
            const type = document.getElementById("participationType").value;
            const teamName = document.getElementById("teamName").value.trim();
            const teamSize = document.getElementById("teamSize").value;

            const msg = document.getElementById("registerMsg");

            const regPattern = /^[A-Z]{2}[0-9]{3}$/;
            const mobilePattern = /^[0-9]{10}$/;

            function showError(text) {
                msg.innerText = text;
                msg.className = "error";
            }
           
            if (!name) return showError("Enter name");
            if (!email.includes("@")) return showError("Invalid email");
            if (!mobilePattern.test(mobile)) return showError("Invalid mobile number");
            if (!regPattern.test(regNo)) return showError("Reg format: CS101");
            if (!event) return showError("Select event");
           
            if (event === "Robotics" || event === "Gaming Tournament") {
                return showError("This event is closed");
            }

            
            if (type === "Team") {
                if (!teamName) return showError("Enter team name");
                if (teamSize < 2 || teamSize > 4) return showError("Team size must be 2–4");
            }

            
            if (registrations.some(r => r.regNo === regNo && r.event === event)) {
                return showError("Duplicate registration found");
            }

            registrations.push({
                name,
                regNo,
                event,
                type,
                teamName,
                teamSize });

            /* ADD TO TABLE */
            const tableBody = document.querySelector("#participantTable tbody");

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>${regNo}</td>
                <td>${event}</td>
                <td>${type}</td>
                <td>${teamName || "-"}</td>
                <td>${teamSize || "-"}</td>
            `;

            tableBody.appendChild(row);


            document.getElementById("totalCount").innerText = registrations.length;
            msg.innerText = "Registration successful";
            msg.className = "success";
            regForm.reset();
        });
    }

    let ratings = [];

    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {

        feedbackForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("fbName").value.trim();
            const regNo = document.getElementById("fbReg").value.trim();
            const event = document.getElementById("fbEvent").value;
            const rating = document.getElementById("rating").value;
            const comments = document.getElementById("comments").value.trim();

            const msg = document.getElementById("feedbackMsg");
            const summary = document.getElementById("summary");

            const regPattern = /^[A-Z]{2}[0-9]{3}$/;

            function showError(text) {
                msg.innerText = text;
                msg.className = "error";
            }

            if (!regPattern.test(regNo)) return showError("Invalid reg number");
            if (!event) return showError("Select event");
            if (!rating) return showError("Select rating");
            if (comments.length < 20) return showError("Min 20 characters required");

            ratings.push(Number(rating));

            const avg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);

            msg.innerText = "Feedback submitted successfully";
            msg.className = "success";

            summary.innerHTML = `
                <h3>Feedback Summary</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Event:</b> ${event}</p>
                <p><b>Your Rating:</b> ${rating}</p>
                <p><b>Average Rating:</b> ${avg}</p>
            `;
            feedbackForm.reset();
        });
    }
});