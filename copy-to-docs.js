// copy-to-docs.js
const fs = require("fs");
const path = require("path");

const filesToCopy = ["index.html", "chat.html"];
const foldersToCopy = ["dist"];

const docsDir = path.join(__dirname, "docs");

// Create docs/ if not exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Copy files
filesToCopy.forEach(file => {
  fs.copyFileSync(path.join(__dirname, file), path.join(docsDir, file));
});

// Copy folders recursively
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to);
  fs.readdirSync(from).forEach(file => {
    const src = path.join(from, file);
    const dest = path.join(to, file);
    if (fs.lstatSync(src).isDirectory()) {
      copyFolderSync(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  });
}

foldersToCopy.forEach(folder => {
  copyFolderSync(path.join(__dirname, folder), path.join(docsDir, folder));
});

console.log("Copied to /docs for GitHub Pages.");
