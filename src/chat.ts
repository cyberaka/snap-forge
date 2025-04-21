const chatInput = document.getElementById("chatInput") as HTMLInputElement;
const chatSendBtn = document.getElementById("chatSendBtn") as HTMLButtonElement;
const chatPanel = document.getElementById("chatPanel") as HTMLDivElement;

chatSendBtn.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");

  // Simulate server response
  setTimeout(() => {
    const response = `Server response to: "${message}"`;
    appendMessage(response, "bot");
  }, 500);

  chatInput.value = "";
});

function appendMessage(text: string, sender: "user" | "bot") {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;

  msgDiv.appendChild(bubble);
  chatPanel.appendChild(msgDiv);

  chatPanel.scrollTop = chatPanel.scrollHeight;
}
