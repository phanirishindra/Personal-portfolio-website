document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 🔒 Prevents the form from reloading the page

  const name = document.getElementById('name').value;   // 📥 Get user's name
  const email = document.getElementById('email').value; // 📥 Get user's email
  const message = document.getElementById('message').value; // 📥 Get user's message

  // ✅ List of allowed email domains
  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com", "protonmail.com"];

  // ✂️ Split email like "abc@gmail.com" to get "gmail.com"
  const domain = email.split("@")[1]; 

  // ❌ If email domain is not in allowed list, show alert and stop
  if (!allowedDomains.includes(domain)) {
    alert("Only emails from Gmail, Outlook, Yahoo, or ProtonMail are allowed.");
    return; // ⛔ Stop the rest of the code
  }

  // ✅ If email is allowed, save the message to local storage
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push({ name, email, message });
  localStorage.setItem("messages", JSON.stringify(messages));

  this.reset(); // 🧹 Clear the form
  document.getElementById('success-message').classList.remove('hidden'); // ✅ Show success message

  setTimeout(() => {
    document.getElementById('success-message').classList.add('hidden'); // 🕒 Hide success message after 3 seconds
  }, 3000);
});
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

function loadQA() {
  const raw = fs.readFileSync("data.json");
  return JSON.parse(raw);
}

app.post("/ask", (req, res) => {
  const { question } = req.body;
  const data = loadQA();
  const found = data.find(entry =>
    question.toLowerCase().includes(entry.question.toLowerCase())
  );
  if (found) {
    res.json({ answer: found.answer });
  } else {
    res.json({ answer: "Hmm... Future Sathwik hasn't answered that yet." });
  }
});

app.post("/add", (req, res) => {
  const { question, answer } = req.body;
  const data = loadQA();
  data.push({ question, answer });
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const simpleGit = require('simple-git');
const git = simpleGit();

app.get('/api/git-status', async (req, res) => {
  try {
    const log = await git.log();
    const branches = await git.branch();
    const status = await git.status();

    res.send({
      latestCommit: log.latest.date,
      totalCommits: log.total,
      branches: Object.keys(branches.branches).length,
      isClean: status.isClean()
    });
  } catch (err) {
    res.status(500).send("Git Error");
  }
});
