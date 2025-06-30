import {
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Stack,
  CardMedia,
} from "@mui/material";
import type {Auction} from "../interfaces/auctionInterface";
import {t} from "i18next";

interface AuctionProps {
    auction: Auction;
}
export const AuctionDetails = ({auction} : AuctionProps) => {
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {auction.title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          padding: 2,
          borderRadius: 1,
        }}
      >
        {auction.description}
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
            height="400"
            image={auction.image || "/static/images/placeholder.png"}
            alt={auction.title}
            sx={{
              borderRadius: 2,
              mb: 3,
              width: "100%",
            }}
          />
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  minWidth: 120,
                  color: "text.secondary",
                }}
              >
                {auction.status === "finished"
                  ? t("auction.finalPrice")
                  : auction.status === "actual"
                  ? t("auction.currentBid")
                  : t("auction.basePrice")}
                :
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ${auction.currentBid || auction.basePrice}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                label={auction.status}
                color={
                  auction.status === "finished"
                    ? "success"
                    : auction.status === "actual"
                    ? "primary"
                    : "default"
                }
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                {new Date(auction.startTime).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                {Math.floor(auction.duration / 3600)}h{" "}
                {Math.floor((auction.duration % 3600) / 60)}m
              </Typography>
            </Box>
          </Grid>
        </Stack>
      </Box>

      {auction.status !== "finished" && (
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            px: 4,
            fontWeight: "bold",
          }}
        >
          {t("auction.placeBid")}
        </Button>
      )}
    </div>
  );
};
