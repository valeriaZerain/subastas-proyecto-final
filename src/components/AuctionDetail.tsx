import {
  Typography,
  Box,
  Grid,
  Chip,
  Stack,
  CardMedia,
  Container,
} from "@mui/material";
import { t } from "i18next";
import { useAuctionStore } from "../store/auctionStore";
import { useBidStore } from "../store/bidStore";
import { AuctionTimer } from "./Timer";
import { useEffect, useRef } from "react";
import { postAuctionWinner } from "../services/Auction";

export const AuctionDetails = () => {
  const { selectedAuction, setSelectedAuction } = useAuctionStore();
  const bids = useBidStore((state) => state.bids);
  const previousStatusRef = useRef<string | null>(null);
  const highestBid = Math.max(0, ...bids.map((b) => b.amount));

  useEffect(() => {
    if (selectedAuction && selectedAuction.currentBid !== highestBid) {
      setSelectedAuction({ ...selectedAuction, currentBid: highestBid });
    }
  }, [bids, selectedAuction]);

  useEffect(() => {
    const currentStatus = selectedAuction?.status;

    if (
      previousStatusRef.current === "actual" &&
      currentStatus === "finished"
    ) {
      const winnerBid = bids.reduce((prev, current) =>
        prev.amount > current.amount ? prev : current
      );

      if (winnerBid && winnerBid.userId && selectedAuction) {
        postAuctionWinner(
          selectedAuction.id,
          winnerBid.userId,
          winnerBid.user?.name || "Usuario",
          winnerBid.amount
        );
      }
    }
    previousStatusRef.current = currentStatus ?? null;
  }, [selectedAuction?.status]);

  if (!selectedAuction) {
    return (
      <Container
        maxWidth="md"
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {t("auction.noAuctionSelected") || "No auction selected."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        pb: 1,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {selectedAuction.title}
      </Typography>
      {selectedAuction.status === "actual" && (
        <AuctionTimer
          auction={selectedAuction}
          onStatusChange={(newStatus) => {
            useAuctionStore.getState().setSelectedAuction({
              ...selectedAuction,
              status: newStatus,
            });
          }}
        />
      )}
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          padding: 2,
          borderRadius: 1,
        }}
      >
        {selectedAuction.description}
      </Typography>

      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          p: 3,
          mb: 3,
          boxShadow: 1,
        }}
      >
        <Stack spacing={2}>
          <CardMedia
            component="img"
            height="200"
            image={selectedAuction.image || "/static/images/placeholder.png"}
            alt={selectedAuction.title}
            sx={{
              borderRadius: 2,
              mb: 3,
              width: "100%",
            }}
          />
          <Grid sx={{ xs: 12 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  minWidth: 120,
                  color: "text.secondary",
                }}
              >
                {selectedAuction.status === "finished"
                  ? t("auction.finalPrice")
                  : selectedAuction.status === "actual"
                  ? t("auction.currentBid")
                  : t("auction.basePrice")}
                :
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ${selectedAuction.currentBid || selectedAuction.basePrice}
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  minWidth: 120,
                  color: "text.secondary",
                }}
              >
                {t("auction.status")}:
              </Typography>
              <Chip
                label={selectedAuction.status}
                color={
                  selectedAuction.status === "finished"
                    ? "success"
                    : selectedAuction.status === "actual"
                    ? "primary"
                    : "default"
                }
                size="small"
              />
            </Box>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  minWidth: 120,
                  color: "text.secondary",
                }}
              >
                {t("auction.startTime")}:
              </Typography>
              <Typography variant="body2">
                {new Date(selectedAuction.startTime)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ")}
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  minWidth: 120,
                  color: "text.secondary",
                }}
              >
                {t("auction.duration")}:
              </Typography>
              <Typography variant="body2">
                {Math.floor(selectedAuction.duration / 3600)}h{" "}
                {Math.floor((selectedAuction.duration % 3600) / 60)}m
              </Typography>
            </Box>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
};
