const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5010;


app.use(cors());
app.use(express.json());

let clients = [];
function getActiveAuctions() {
  const now = new Date();
  return data.auctions.filter(auction => {
    const startTime = new Date(auction.startTime);
    const endTime = new Date(startTime.getTime() + auction.duration * 1000);
    return now >= startTime && now <= endTime;
  });
}

function sendBidUpdate(auctionId, bid) {
  const activeAuctions = getActiveAuctions();
  const isActive = activeAuctions.some(a => a.id === auctionId);
  
  if (isActive) {
    const update = {
      type: "bid_update",
      auctionId,
      bid
    };
    
    clients.forEach(client => {
      client.write(`data: ${JSON.stringify(update)}\n\n`);
    });
  }
}

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const activeAuctions = getActiveAuctions();
  res.write(`data: ${JSON.stringify({
    type: "initial_state",
    activeAuctions
  })}\n\n`);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };

  clients.push(newClient);

  req.on("close", () => {
    console.log(`Client ${clientId} disconnected`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

app.post("/bids", (req, res) => {
  const { auctionId, userId, amount } = req.body;
  
  if (!auctionId || !userId || !amount) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  
  const auction = data.auctions.find(a => a.id === auctionId);
  if (!auction) {
    return res.status(404).json({ error: "Subasta no encontrada" });
  }
  
  const now = new Date();
  const startTime = new Date(auction.startTime);
  const endTime = new Date(startTime.getTime() + auction.duration * 1000);
  
  if (now < startTime || now > endTime) {
    return res.status(400).json({ error: "La subasta no está activa" });
  }
  
  if (amount <= auction.currentBid) {
    return res.status(400).json({ error: "La puja debe ser mayor que la actual" });
  }
  
  const newBid = {
    id: Date.now().toString(),
    auctionId,
    userId,
    amount,
    timestamp: now.toISOString()
  };
  
  data.bids.push(newBid);
  auction.currentBid = amount;
  
  sendBidUpdate(auctionId, newBid);
  
  res.status(201).json(newBid);
});

app.get("/active-auctions", (req, res) => {
  res.json(getActiveAuctions());
});

app.listen(PORT, () => {
  console.log(`Servidor SSE funcionando en el puerto: ${PORT}`);
});