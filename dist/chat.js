"use strict";
var chatInput = document.getElementById("chatInput");
var chatSendBtn = document.getElementById("chatSendBtn");
var chatPanel = document.getElementById("chatPanel");
// Function to handle sending a message
function sendMessage() {
    var message = chatInput.value.trim();
    if (!message)
        return;
    appendMessage(message, "user");
    // Simulate server response
    setTimeout(function () {
        var response = "Server response to: \"".concat(message, "\"");
        appendMessage(response, "bot");
    }, 500);
    chatInput.value = "";
}
// Add event listener for the "Send" button
chatSendBtn.addEventListener("click", sendMessage);
// Add event listener for the "Enter" key in the input field
chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        sendMessage();
    }
});
// Function to append a message to the chat panel
function appendMessage(text, sender) {
    var msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
    var bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatPanel.appendChild(msgDiv);
    // Scroll to the bottom of the chat panel
    chatPanel.scrollTop = chatPanel.scrollHeight;
}
