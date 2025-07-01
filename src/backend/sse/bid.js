const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5001;

let clients = [];

app.get("/events", (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  res.write(":ok\n\n");
  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

function broadcastSSE(data) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

app.post("/bids", (req, res) => {
  const newBid = req.body;
  broadcastSSE({ tipo: "newbid", puja: newBid });
  res.status(201).json({ puja: newBid });
});

app.listen(PORT, () => {
  console.log(`Servidor SSE corriendo en http://localhost:${PORT}`);
});

app.post("/winner", (req, res) => {
  const { auctionId, winnerId, amount, winnerName } = req.body;

  broadcastSSE({
    tipo: "winner",
    auctionId,
    winnerId,
    amount,
    winnerName,
  });

  res.status(200).json({ success: true });
}); 