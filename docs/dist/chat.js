"use strict";
var chatInput = document.getElementById("chatInput");
var chatSendBtn = document.getElementById("chatSendBtn");
var chatPanel = document.getElementById("chatPanel");
chatSendBtn.addEventListener("click", function () {
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
});
function appendMessage(text, sender) {
    var msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
    var bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatPanel.appendChild(msgDiv);
    chatPanel.scrollTop = chatPanel.scrollHeight;
}
