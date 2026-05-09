# 📋 Clippr

A fast, minimal clipboard manager for Linux built with Tauri, Rust, React and Python.

---

## ✨ Features

- 📝 **Clipboard history** — automatically saves everything you copy
- 🖼️ **Image support** — screenshots and images are saved too
- 🏷️ **Auto-tagging** — entries are automatically tagged as `url`, `json`, `sql`, `code`, `email` or `text`
- 📌 **Pin entries** — pin important entries so they never get lost
- 🔍 **Search** — search through your clipboard history instantly
- 🗂️ **Filter by tag** — filter entries by type
- 🗑️ **Clear history** — clear all unpinned entries with one click
- 🖥️ **System tray** — runs silently in the background

---

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| Desktop shell | Tauri |
| Backend | Rust |
| Frontend | React + TypeScript + Tailwind CSS |
| Database | SQLite (via rusqlite) |
| Tagger | Python + Flask |

---

## 🚀 Running locally

**Prerequisites:** Node.js, Rust, Python 3

```bash
# Install dependencies
make setup

# Run in development mode
make dev
```

---

## 📦 Building

```bash
make build
```

---

## 🐧 AUR

```bash
yay -S clippr
```

---

## 📁 Project structure

```
clippr/
├── src/                  # React frontend
│   ├── components/       # UI components
│   └── hooks/            # Custom React hooks
├── src-tauri/            # Rust backend
│   └── src/mods/         # Rust modules
└── tagger/               # Python tagger service
```

---

## 📄 License

MIT
