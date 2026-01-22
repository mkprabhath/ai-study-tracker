const API_URL = "http://localhost:5000/api/subjects";

function loadSubjects() {
    fetch(API_URL)
        .then(res => res.json())
        .then(subjects => {
            const list = document.getElementById("subjectList");
            list.innerHTML = "";

            subjects.forEach(sub => {
                const li = document.createElement("li");
                li.textContent = sub.name;
                list.appendChild(li);
            });
        });
}

function addSubject() {
    const input = document.getElementById("subjectInput");
    const name = input.value.trim();

    if (!name) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    })
    .then(() => {
        input.value = "";
        loadSubjects();
    });
}

// Load subjects when page opens
loadSubjects();
