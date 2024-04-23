const joinRoomBtn = document.querySelector("button#room-button");
const messageInput = document.querySelector("input#message-input");
const roomInput = document.querySelector("input#room-input");
const form = document.querySelector("form#form");
const messageContainer = document.querySelector("div#message-container");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const message = messageInput.value;
	const room = roomInput.value;
	if (message === "") return;
	displayMessage(message);
	messageInput.value = "";
});

joinRoomBtn.addEventListener("click", (e) => {
	const room = roomInput.value;
});

const displayMessage = (message) => {
	const div = document.createElement("div");
	div.textContent = message;
	messageContainer.append(div);
};
