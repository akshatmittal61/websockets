import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = app.listen(port, () =>
	console.info(`Server is listening at http://localhost:${port}`)
);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
	ws.on("message", (data) => {
		console.log(`data from client: ${data}`);
		ws.send("Gotcha!");
	});
});
