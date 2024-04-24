import React, { useState } from "react";

const App = () => {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [room, setRoom] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (message === "") return;
		setMessages((prev) => [...prev, message]);
		setMessage("");
	};

	return (
		<>
			<div id="message-container">
				{messages.map((message, index) => (
					<div key={`message-${index}`}>{message}</div>
				))}
			</div>
			<form id="form" onSubmit={handleSubmit}>
				<div class="form-group">
					<label for="message-input">Message</label>
					<input
						type="text"
						name="message-input"
						id="message-input"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type="submit" id="send-button">
						Send
					</button>
				</div>
				<div class="form-group">
					<label for="room-input">Room</label>
					<input
						type="text"
						name="room-input"
						id="room-input"
						value={room}
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button type="submit" id="room-button">
						Join
					</button>
				</div>
			</form>
		</>
	);
};

export default App;
