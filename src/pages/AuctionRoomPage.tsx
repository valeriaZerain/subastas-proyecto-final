import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useAuctionStore } from "../store/auctionStore";
import type { Auction } from "../interfaces/auctionInterface";
import { t } from "i18next";

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {auction.title}
      </Typography>
      <Box
        component="img"
        src={auction.image}
        alt={auction.title}
        sx={{ width: "100%", maxHeight: 400, objectFit: "cover", mb: 2 }}
      />
      <Typography variant="body1" sx={{ mb: 2 }}>
        {auction.description}
      </Typography>

      <Typography variant="h6">
        {auction.status === "finished"
          ? t("auction.finalPrice")
          : auction.status === "actual"
          ? t("auction.currentBid")
          : t("auction.basePrice")}
        : ${auction.currentBid || auction.basePrice}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        {t("auction.status")}: {auction.status}
      </Typography>

      <Typography variant="body2">
        {t("auction.startTime")}: {new Date(auction.startTime).toLocaleString()}
      </Typography>

      <Typography variant="body2">
        {t("auction.duration")}: {auction.duration}s
      </Typography>

      {auction.status !== "finished" && (
        <Button variant="contained" sx={{ mt: 3 }}>
          {t("auction.placeBid")}
        </Button>
      )}
    </Container>
  );
}

export default AuctionRoomPage;
