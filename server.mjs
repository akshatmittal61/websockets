import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { PORT as port } from "./config/index.mjs";

const app = express();
app.use(cors());

const httpServer = app.listen(port, () =>
	console.info(`Server is listening at http://localhost:${port}`)
);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

app.get("/api/health", (req, res) => {
	return res.status(200).json({ message: "API is Healthy" });
});

io.on("connection", (socket) => {
	console.log(`${socket.id} user just connected!`);
	const token = socket.handshake.auth;
	console.log(token);
	socket.on("send_message", (data) => {
		console.info(`Message from Client: ${data}`);
		io.emit("recieve_message", `From server: ${data}`);
	});
	socket.on("chat message", (message) => {
		console.log("chat message recieved on server", message);
	});
	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});
