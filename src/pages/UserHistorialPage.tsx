import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserAuctionHistory } from "../services/Auction";
import type { Auction } from "../interfaces/auctionInterface";

function UserHistorialPage() {
  const { id } = useParams();
  const [auctionHistory, setAuctionHistory] = useState<Auction[]>([]);

  useEffect(() => {
    if (!id) return;
    getUserAuctionHistory(id).then(setAuctionHistory);
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        {t("auctionHistory.title")}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("auctionHistory.auction")}</TableCell>
              <TableCell align="right">{t("auctionHistory.amount")}</TableCell>
              <TableCell>{t("auctionHistory.time")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctionHistory.map((auction) => (
              <TableRow key={auction.id}>
                <TableCell>{auction.title}</TableCell>
                <TableCell align="right">
                  {auction.bids && auction.bids.length > 0
                    ? `$${auction.bids[auction.bids.length - 1].amount}`
                    : "-"}
                </TableCell>
                <TableCell>
                  {auction.bids && auction.bids.length > 0
                    ? new Date(
                        auction.bids[auction.bids.length - 1].timestamp
                      ).toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserHistorialPage;
