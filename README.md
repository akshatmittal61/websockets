# Web Sockets

WebSocket is a computer communication protocol which provides simultaneous two-way communication channel over a single TCP connection.

WebSocket is designed to work over HTTP ports 443 and 80 as well as to support HTTP proxies and intermediaries. To achieve compatibility, the WebSocket handshake uses the HTTP upgrade header (101) to change from HTTP protocol to WebSocket protocol.

The WebSocket protocol enables Full-Duplex interaction between an application and a web server with lower overhead than half-duplex alternatives like HTTP polling, facilitating real-time data transfer from and to the server.

- Fully Duplex Bi-Directional communication
- It is an HTTP upgrade
- Client sends a handshake request to server.
- This requests to upgrade the protocol from HTTP to web sockets.
- Server accepts and upgrades from `HTTP/1.1` to `HTTP/2` by sending status `101`.
- Easy to implement and standardised
- Headers are only sent once, when accepting the HTTP upgrade.

**Ports**:
1. TCP port 443 for secure connections.
2. TCP port 80 for unsecured connections.

WebSocket enables streams of messages on top of TCP. TCP alone deals with streams of bytes with no inherent concept of a message.

**Protocols**
1. WebSocket (ws)
2. WebSocket Secure (wss)

## Similar things

### Polling

- **Short Polling**: Send AJAX request every $x$ amount of seconds for new data, (mock real-time).
- **Long Polling**: Send request to server and keep connection open till some new data comes up. This usually results in timeout and client needs to periodically send new requests.

### Server Sent Events
- They use `EventSource` API to send messages from server. 
- It's not truly bi-directional.
- They generally requires an event loop.
- No binary message capability.

## Differences between HTTP and Web Sockets

| HTTP            | Web Sockets    |
| --------------- | -------------- |
| Stateless       | Stateful       |
| Uni-Directional | Bi-directional |
| Half Duplex     | Full Duplex    |

Yet Web Sockets can't replace HTTP, some plausible reasons:
- HTTP provides automatic caching
- Web Sockets often needs special configuration for load balancing.
- Can't communication with REST.
- It's useful for when we need full-duplex connection.
- For example, in web based games, chatting applications, anything which needs low-latency realtime connection.

# References

1. WebSocket: [Wikipedia](https://en.wikipedia.org/wiki/WebSocket)
2. HTTP Polling: [Wikipedia](https://en.wikipedia.org/wiki/Polling_(computer_science))
3. A Beginner's guide to Web Sockets (Free Code Camp): [Youtube](https://www.youtube.com/watch?v=8ARodQ4Wlf4)
4. WS: [Package](https://www.npmjs.com/package/ws)
5. Socket.io: [Documentation](https://socket.io/)