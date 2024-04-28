import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

const App = () => {
	const [isConnectionEstablished, setIsConnectionEstablished] =
		useState(false);
	const [socket, setSocket] = useState();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [room, setRoom] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
		if (message === "") return;
		if (!socket) return toast.error("Unable to connect to server");
		socket.emit("send_message", message);
		setMessage("");
	};

	const joinRoom = (e) => {
		e.preventDefault();
	};

	const establishConnection = () => {
		if (isConnectionEstablished && socket)
			return toast.error("Connection already established");
		const currentSocket = io("http://localhost:8080", {
			auth: {
				token: "some-random-token",
			},
		});
		setIsConnectionEstablished(true);
		setSocket(currentSocket);
		currentSocket.on("connect", () => {
			toast.success("Made socket connection");
		});
		currentSocket.on("message_from_server", (data) => {
			toast(`Message from server: ${data}`);
			console.log(`Message from server: ${data}`);
		});
		currentSocket.on("disconnect", () => {
			toast.success("Disconnected");
		});
		currentSocket.on("connect_error", (err) => {
			toast.error(`Connection error: ${err}`);
		});
	};

	useEffect(() => {
		if (socket) {
			socket.on("recieve_message", (message) => {
				setMessages((prev) => [...prev, message]);
			});
		}
	}, [socket]);

	useEffect(() => {
		establishConnection();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
