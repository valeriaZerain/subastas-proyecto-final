import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid
} from "@mui/material";
import { useAuctionStore } from "../store/auctionStore";
import type { Auction } from "../interfaces/auctionInterface";
import { AuctionDetails } from "../components/AuctionDetail";
import { Bid } from "../components/Bid";

function AuctionRoomPage() {
  const { id } = useParams<{ id: string }>();
  const { auctions, fetchAuctions } = useAuctionStore();
  const [auction, setAuction] = useState<Auction | null>(null);

  useEffect(() => {
    fetchAuctions();
  }, []);

  useEffect(() => {
    if (id && auctions.length > 0) {
      const found = auctions.find((a) => a.id === id);
      setAuction(found ?? null);
    }
  }, [id, auctions]);

  if (!auction) {
    return (
      <Container>
        <Typography variant="h6">Cargando subasta...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <AuctionDetails auction={auction} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Bid/>
      </Grid>
    </Grid>
  </Container>
  );
}

export default AuctionRoomPage;
