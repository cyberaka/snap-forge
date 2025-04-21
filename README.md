# SnapForge

SnapForge is a simple, TypeScript + Bootstrap-based web UI for tweaking images iteratively.

## 🔥 Features

- Upload a seed image and apply prompt-based transformations
- View image transformation history
- Continue refining based on the latest tweaked image
- Conversation-style chat page to simulate prompt-image interaction

## 🗂️ Project Structure

```
.
├── index.html           # Main interface for image tweaking
├── chat.html            # Chat-style interface for conversations
├── src/
│   ├── app.ts           # TypeScript for main interface
│   └── chat.ts          # TypeScript for chat interface
├── dist/                # Output folder for compiled JavaScript
├── tsconfig.json        # TypeScript config
└── package.json         # NPM scripts and dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Dev Server with Live Compilation

```bash
npm run dev
```

This command does:

- `tsc --watch`: Compiles TypeScript from `src/` to `dist/`
- `lite-server`: Serves the site and watches for file changes

### 3. Access the App

- Open `http://localhost:3000/index.html` for the tweak interface
- Open `http://localhost:3000/chat.html` for the conversation interface

## 📦 Build Manually

```bash
npm run watch   # Only compile TypeScript
npm run start   # Only run static server
```

## 📄 License

MIT License
