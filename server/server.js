const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

const DATA_FILE = path.join(__dirname, "subjects.json");

/* ---------- helpers ---------- */
function readSubjects() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return data ? JSON.parse(data) : [];
}

function writeSubjects(subjects) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(subjects, null, 2));
}

/* ---------- routes ---------- */
app.get("/api/subjects", (req, res) => {
  res.json(readSubjects());
});

app.post("/api/subjects", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Subject required" });

  const subjects = readSubjects();
  subjects.push({ name, completed: false });
  writeSubjects(subjects);

  res.json(subjects);
});

app.put("/api/subjects/:index", (req, res) => {
  const subjects = readSubjects();
  const i = req.params.index;

  subjects[i].completed = !subjects[i].completed;
  writeSubjects(subjects);

  res.json(subjects);
});

app.delete("/api/subjects/:index", (req, res) => {
  const subjects = readSubjects();
  subjects.splice(req.params.index, 1);
  writeSubjects(subjects);

  res.json(subjects);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
