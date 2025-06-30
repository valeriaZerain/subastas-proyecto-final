// components/AuctionCard.tsx

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { createContext, useContext } from "react";
import type { Auction } from "../interfaces/auctionInterface";
import { t } from "i18next";

// Contexto para compartir el `auction` entre subcomponentes
const AuctionCardContext = createContext<Auction | null>(null);

const Root = ({
  children,
  auction,
}: {
  children: React.ReactNode;
  auction: Auction;
}) => {
  return (
    <AuctionCardContext.Provider value={auction}>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {children}
      </Card>
    </AuctionCardContext.Provider>
  );
};

const Image = () => {
  const auction = useContext(AuctionCardContext);
  if (!auction) return null;

  return (
    <CardMedia
      sx={{ height: 140 }}
      image={auction.image || "/static/images/placeholder.png"}
      title="auctionPhoto"
    />
  );
};

const Content = () => {
  const auction = useContext(AuctionCardContext);
  if (!auction) return null;

  return (
    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          minHeight: "56px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {auction.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          minHeight: "48px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {auction.description}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mt: "auto" }}
      >
        {auction.status === "finished"
          ? t("auction.finalPrice")
          : auction.status === "actual"
          ? t("auction.currentBid")
          : t("auction.basePrice")}
        : ${auction.currentBid || auction.basePrice}
      </Typography>
    </CardContent>
  );
};

const Actions = ({ onClick }: { onClick: () => void }) => {
  const auction = useContext(AuctionCardContext);
  if (!auction) return null;

  return (
    <CardActions>
      <Button
        size="small"
        variant="outlined"
        onClick={onClick}
        disabled={auction.status === "finished"}
      >
        {t("auction.go")}
      </Button>
    </CardActions>
  );
};

export const AuctionCard = {
  Root,
  Image,
  Content,
  Actions,
};
