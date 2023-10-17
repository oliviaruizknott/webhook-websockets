// In the root directory, run `node server.js`

import dotenv from "dotenv";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

//////////////////////////
// START WEBSOCKET SERVER
//////////////////////////

const GREEN = "42m";
const RED = "41m";

const eventLog = (msg, color = GREEN) => {
  console.log("===================================");
  console.log(`\x1b[${color}%s\x1b[0m`, ` ${msg} `);
  console.log("===================================");
};

dotenv.config();
const wssPort = process.env.VITE_WS_PORT || 8082;
const wss = new WebSocketServer({ port: wssPort });
eventLog(`WebSocket server is listening on port ${wssPort}`);

const clients = {};

const sendToAll = (data, isBinary = false) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, { binary: isBinary });
    }
  });
};

wss.on("connection", (ws, req) => {
  const clientIp = req.connection.remoteAddress;
  const id = Math.random().toString(36).substr(2, 7);
  clients[clientIp] = id;

  eventLog(`👋 New client connected! ${clientIp}`);
  console.log("Number of clients: ", wss.clients.size);
  console.log(clients);

  ws.send(JSON.stringify(`👋 Welcome to the server!`));

  ws.on("message", (data, isBinary) => {
    // log the message to the server console
    console.log(`[JSON IN]: ${data}`);

    // relay message to all clients
    sendToAll(data, isBinary);
  });

  ws.on("close", () => {
    eventLog(" 💔 Client has disconnected.", RED);

    delete clients[clientIp];
    console.log("Number of clients: ", wss.clients.size);

    sendToAll(JSON.stringify(`💔 Someone left.`));
  });
});

//////////////////////////
// START EXPRESS SERVER
//////////////////////////

const app = express(); // Create an Express application
const port = process.env.HTTP_PORT || 3000; // Define the HTTP server port

// Add an endpoint to handle incoming POST requests
app.use(express.json()); // Parse JSON request bodies

// Add a GET request handler at the root
app.get("/", (req, res) => {
  res.json({ message: "You're at the root!" });
});

// Add a POST request handler at the /webhook endpoint.
// This is expecting specific data from the NFC.cool webhook that looks like:
// {
//   tagIdentifier: '04:E1:3D:8A:13:6F:80',
//   date: '2023-10-12T23:57:46Z',
//   content: 'Does this tag trigger the web hook?'
// }
app.post("/webhook", (req, res) => {
  // Log the data from the POST request body to the console
  eventLog("Webook POST received!");
  console.log("[POST Request Body]:", req.body);
  res.status(200).json({ message: "Data received" }); // Send a response

  if (req.body.tagIdentifier) {
    sendToAll(
      JSON.stringify(
        formatForAppStore("TAG_IDENTIFIER", req.body.tagIdentifier)
      )
    );
  }

  if (req.body.date) {
    sendToAll(JSON.stringify(formatForAppStore("DATE", req.body.date)));
  }

  if (req.body.content) {
    sendToAll(JSON.stringify(formatForAppStore("CONTENT", req.body.content)));
  }
});

app.listen(port, () => {
  eventLog(`HTTP server is listening on port ${port}`);
});

const formatForAppStore = (key, value) => {
  return {
    key: key,
    value: value,
    store: true,
    type: "string",
  };
};
