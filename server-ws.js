const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

const clients = [];

wss.on("connection", function connection(ws) {
  const id = clients.length;
  clients[id] = ws;

  // sending to client, who joined
  clients[id].send(
    JSON.stringify({ type: "hello", message: `Hi your id = ${id}`, client: id })
  );

  // sending to clients, who is already exist
  clients.forEach((client) =>
    client.send(
      JSON.stringify({
        type: "info",
        message: `We have new connection ${id}`,
        client: id,
      })
    )
  );

  ws.on("message", function incoming(message) {
    clients.forEach((client) =>
      client.send(
        JSON.stringify({
          type: "message",
          message: message.toString,
          author: id,
        })
      )
    );
  });

  ws.on("close", () => {
    delete clients[id];
    clients.forEach((client) =>
      client.send(
        JSON.stringify({
          type: "info",
          message: `We lost connection ${id}`,
        })
      )
    );
  });

  ws.on("error", (err) => {
    console.log(err.message);
  });
});
