const chatInput = document.getElementById("chatInput") as HTMLInputElement;
const chatSendBtn = document.getElementById("chatSendBtn") as HTMLButtonElement;
const chatPanel = document.getElementById("chatPanel") as HTMLDivElement;

// Function to handle sending a message
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");

  try {
    // Make a POST request to http://localhost:8080/chat with the message
    const response = await fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (response.ok) {
      // If the response is OK, parse it as text
      const responseData = await response.text();
      appendMessage(responseData, "bot");
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }

  chatInput.value = "";
}

// Add event listener for the "Send" button
chatSendBtn.addEventListener("click", sendMessage);

// Add event listener for the "Enter" key in the input field
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission
    sendMessage();
  }
});

// Function to append a message to the chat panel
function appendMessage(text: string, sender: "user" | "bot") {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;

  msgDiv.appendChild(bubble);
  chatPanel.appendChild(msgDiv);

  // Scroll to the bottom of the chat panel
  chatPanel.scrollTop = chatPanel.scrollHeight;
}
