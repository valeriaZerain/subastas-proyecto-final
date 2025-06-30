import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Container,
  Typography,
  Grid
} from "@mui/material";
import { useAuctionStore } from "../store/auctionStore";
import { AuctionDetails } from "../components/AuctionDetail";
import { Bid } from "../components/Bid";

function AuctionRoomPage() {
  const { id } = useParams<{ id: string }>();
  const { auctions, fetchAuctions, selectedAuction, setSelectedAuction } = useAuctionStore();

  useEffect(() => {
    fetchAuctions();
  }, []);

  useEffect(() => {
    if (id && auctions.length > 0) {
      const found = auctions.find((a) => a.id === id);
      setSelectedAuction(found ?? null);
    }
  }, [id, auctions]);

  if (!selectedAuction) {
    return (
      <Container>
        <Typography variant="h6">Cargando subasta...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      <Grid size={{ xs: 2, md: 6 }}>
        <AuctionDetails />
      </Grid>
      <Grid size={{ xs: 2, md: 6 }}>
        <Bid/>
      </Grid>
    </Grid>
  </Container>
  );
}

export default AuctionRoomPage;
