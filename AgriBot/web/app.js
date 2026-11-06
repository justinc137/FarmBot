import { generateResponse } from "./bot.js";
import { GREETINGS } from "./knowledge-base.js";

const SUGGESTIONS = [
  "When should I plant maize in Kano?",
  "How do I control fall armyworm?",
  "What fertilizer is good for cassava?",
  "Best practices for tomato in dry season?",
  "How to store yam after harvest?",
  "Soil tips for sandy land",
];

const STORAGE_KEY = "agribot-messages";
const chat = document.getElementById("chat");
const form = document.getElementById("composer");
const input = document.getElementById("prompt");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

const initialMessages = () => [{ role: "assistant", content: GREETINGS[0] }];

function loadMessages() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {}
  return initialMessages();
}

let messages = loadMessages();

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
}

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Minimal markdown: **bold**, _italic_, paragraphs and line breaks.
function renderMarkdown(text) {
  const inline = (s) =>
    escapeHtml(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\s)_(.+?)_(?=\s|$)/g, "$1<em>$2</em>");
  return text
    .split(/\n{2,}/)
    .map((para) => `<p>${para.split("\n").map(inline).join("<br>")}</p>`)
    .join("");
}

function renderMessage({ role, content }) {
  const el = document.createElement("div");
  el.className = `msg ${role}`;
  el.innerHTML = `
    <div class="avatar" aria-hidden="true">${role === "assistant" ? "🌱" : "🧑🏾‍🌾"}</div>
    <div class="bubble">${renderMarkdown(content)}</div>`;
  chat.appendChild(el);
}

function renderAll() {
  chat.innerHTML = "";
  messages.forEach(renderMessage);
  chat.scrollTop = chat.scrollHeight;
}

function ask(question) {
  const q = question.trim();
  if (!q) return;
  const user = { role: "user", content: q };
  const reply = { role: "assistant", content: generateResponse(q) };
  messages.push(user, reply);
  renderMessage(user);
  renderMessage(reply);
  chat.scrollTop = chat.scrollHeight;
  save();
}

const suggestions = document.getElementById("suggestions");
SUGGESTIONS.forEach((q) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = q;
  b.addEventListener("click", () => ask(q));
  suggestions.appendChild(b);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ask(input.value);
  input.value = "";
  input.focus();
});

document.getElementById("clear").addEventListener("click", () => {
  messages = initialMessages();
  save();
  renderAll();
  sidebar.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
});

menuToggle.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

renderAll();
