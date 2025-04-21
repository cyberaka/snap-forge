"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var uploadBtn = document.getElementById("uploadBtn");
    var sendBtn = document.getElementById("sendBtn");
    var lastImageBtn = document.getElementById("lastImageBtn");
    var downloadAllBtn = document.getElementById("downloadAllBtn");
    var resultPanel = document.getElementById("resultPanel");
    var imageHistory = [];
    uploadBtn.addEventListener("click", function () {
        alert("Upload logic goes here");
    });
    sendBtn.addEventListener("click", function () {
        var img = document.createElement("img");
        img.src = "https://picsum.photos/150";
        img.className = "img-thumbnail w-25";
        var wrapper = document.createElement("div");
        wrapper.className = "d-flex align-items-center gap-2";
        // Create the radio button
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "selectedImage"; // Ensures only one image can be selected
        radio.className = "form-check-input";
        // Debugging: Log the radio element to ensure it's created
        console.log("Radio Button Created:", radio);
        // Create the download button
        var downloadBtn = document.createElement("button");
        downloadBtn.className = "btn btn-outline-primary btn-sm";
        downloadBtn.textContent = "Download";
        // Append elements to the wrapper
        wrapper.appendChild(radio);
        wrapper.appendChild(img);
        wrapper.appendChild(downloadBtn);
        // Debugging: Log the wrapper to ensure all elements are appended
        console.log("Wrapper Content:", wrapper);
        // Add the wrapper to the result panel
        resultPanel.prepend(wrapper);
        imageHistory.unshift(img.src);
    });
    lastImageBtn.addEventListener("click", function () {
        alert("Show last image logic");
    });
    downloadAllBtn.addEventListener("click", function () {
        alert("Download all images logic");
    });
});
