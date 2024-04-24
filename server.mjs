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
	socket.on("message_from_client", (data) => {
		console.info(`Message from Client: ${data}`);
	});
	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});
