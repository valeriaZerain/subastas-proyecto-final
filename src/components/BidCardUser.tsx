import { Avatar, Box, Typography } from "@mui/material";
import type { Bid } from "../interfaces/bidInterface";

interface BidCardUserProps {
  bid: Bid;
}
export const BidCardUser = ({ bid }: BidCardUserProps) => {
  const { user } = bid;
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        alt={user?.name || "Usuario anónimo"}
        src={user?.photoUrl || undefined}
        sx={{ width: 48, height: 48 }}
      />
      <Box>
        <Typography variant="h6">
          {user?.name || "Usuario anónimo"}
        </Typography>
        <Typography variant="body2">Monto: ${bid.amount}</Typography>
        <Typography variant="body2">
          Fecha: {new Date(bid.timestamp).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};