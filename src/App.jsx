import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

const App = () => {
	const [isConnectionEstablished, setIsConnectionEstablished] =
		useState(false);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [room, setRoom] = useState("");

	const sendMessage = () => {
		if (message === "") return;
		setMessages((prev) => [...prev, message]);
		setMessage("");
	};

	const joinRoom = () => {};

	const establishConnection = () => {
		if (isConnectionEstablished)
			return toast.error("Connection already established");
		const socket = io("http://localhost:8080", {
			auth: {
				token: "some-random-token",
			},
		});
		setIsConnectionEstablished(true);
		socket.on("connect", () => {
			toast.success("Made socket connection");
		});
		socket.on("message_from_server", (data) => {
			toast(`Message from server: ${data}`);
			console.log(`Message from server: ${data}`);
		});
		socket.on("disconnect", () => {
			toast.success("Disconnected");
		});
		socket.on("connect_error", (err)=>{
			toast.error(`Connection error: ${err}`);
		})
	};

	return (
		<>
			<button onClick={establishConnection}>Connect</button>
			<div id="message-container">
				{messages.map((message, index) => (
					<div key={`message-${index}`}>{message}</div>
				))}
			</div>
			<form id="form" onSubmit={sendMessage}>
				<label htmlFor="message-input">Message</label>
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
			</form>
			<form id="form" onSubmit={joinRoom}>
				<label htmlFor="room-input">Room</label>
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
			</form>
			<Toaster position="top-center" />
		</>
	);
};

export default App;
