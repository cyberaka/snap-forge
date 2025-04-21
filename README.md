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
├── docs/                # Folder served by GitHub Pages (generated)
├── tsconfig.json        # TypeScript config
├── package.json         # NPM scripts and dependencies
└── copy-to-docs.js      # Script to populate docs/ for GitHub Pages
```

---

## 🚀 Getting Started (From Scratch)

### 1. Clone the repository

```bash
git clone https://github.com/cyberaka/snap-forge.git
cd snap-forge
```

### 2. Install dependencies

```bash
npm install
```

---

## 💻 Development

### Start live development with auto-reload and TypeScript watch:

```bash
npm run dev
```

This runs:

- `tsc --watch`: Compiles TypeScript files in `src/` to `dist/`
- `lite-server`: Serves the project and watches for HTML/JS changes

---

## 🛠️ Manual Commands

- Compile TypeScript once:
  ```bash
  npm run watch
  ```
- Run the server without watching:
  ```bash
  npm run start
  ```

---

## 🚀 Deploy to GitHub Pages

GitHub Pages serves files from the `/docs` folder.

### 1. Prepare the `/docs` folder:

```bash
npm run prepare-docs
```

This runs the script `copy-to-docs.js` which copies the latest:

- `index.html`
- `chat.html`
- `dist/` folder

Into `/docs/` folder.

### 2. Commit and push

```bash
git add docs/
git commit -m "Update GitHub Pages site"
git push origin main
```

### 3. Activate GitHub Pages

Go to your repository on GitHub:

- Navigate to **Settings → Pages**
- Select:
  - **Branch**: `main`
  - **Folder**: `/docs`
- Click **Save**

Your site will be live at:

```
https://<your-username>.github.io/snap-forge/
```

---

## 📄 License

MIT License
