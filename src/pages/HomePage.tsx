import {
  Container,
  Grid,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuctionStore } from "../store/auctionStore";
import { AuctionCard } from "../components/AuctionCard";
import { useNavigate } from "react-router-dom";
import type { Auction } from "../interfaces/auctionInterface";
import { t } from "i18next";
function HomePage() {
  const { auctions, fetchAuctions, updateAuctionStatus } = useAuctionStore();
  const [statusFilter, setStatusFilter] = useState<"all" | "actual" | "coming" | "finished">("all");
  const navigate = useNavigate();

  const handleGoToAuction = (id: string) => {
    navigate(`/auction/${id}`);
  };

  const handleStatusChange = (auctionId: string, newStatus: Auction['status']) => {
    updateAuctionStatus(auctionId, newStatus);
  };

  const filteredAuctions = auctions.filter((auction: Auction) =>
    statusFilter === "all" ? true : auction.status === statusFilter
  );
  
  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t("homePage.title")}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography>{t("homePage.filter")}</Typography>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        >
          <MenuItem value="all">{t("homePage.all")}</MenuItem>
          <MenuItem value="actual">{t("homePage.current")}</MenuItem>
          <MenuItem value="coming">{t("homePage.coming")}</MenuItem>
          <MenuItem value="finished">{t("homePage.finished")}</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredAuctions.map((auction: Auction) => (
          <Grid size={{ xs: 2, sm: 4, md: 4 }} key={auction.id}>
            <AuctionCard.Root auction={auction}>
              <AuctionCard.Image 
                onStatusChange={(newStatus) => handleStatusChange(auction.id, newStatus)} 
              />
              <AuctionCard.Content />
              <AuctionCard.Actions onClick={() => handleGoToAuction(auction.id)} />
            </AuctionCard.Root>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;