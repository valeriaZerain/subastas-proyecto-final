import { Box, Typography } from "@mui/material";
import type { Bid } from "../interfaces/bidInterface";

export const BidCardUser = (bid: Bid) => {
  if (!bid || !bid.user) {
    return null;
  }
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6">{bid.user.name}</Typography>
      <Typography variant="body2">Amount: ${bid.amount}</Typography>
      <Typography variant="body2">
        Timestamp: {new Date(bid.timestamp).toLocaleString()}
      </Typography>
    </Box>
  );
};
