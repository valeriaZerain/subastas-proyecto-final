import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBidStore } from "../store/bidStore";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { t } from "i18next";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../store/authStore";
import { createBid } from "../services/BidServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BidCard } from "./BidCardUser";
import { CustomAlert } from "./CustomAlert";
import { useAuctionStore } from "../store/auctionStore";
import type { Bid } from "../interfaces/bidInterface";

export function Bid() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });
  const { selectedAuction } = useAuctionStore();
  const { id: auctionId } = useParams<{ id: string }>();
  const bids = useBidStore((state) => state.bids);
  const fetchBids = useBidStore((state) => state.fetchBids);
  const addBid = useBidStore((state) => state.addBid);
  const user = useAuthStore((state) => state.user);
  const highestBid = Math.max(0, ...bids.map((b) => b.amount));
  const BidSchema = Yup.object({
    amount: Yup.number()
      .required(t("Validation.bidrequired"))
      .min(highestBid + 1, `${t("Validation.bidmin")} ${highestBid + 1}`),
  });
  const formik = useFormik({
    initialValues: { amount: 0 },
    validationSchema: BidSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleSubmitBid(values.amount, auctionId || "");
      resetForm();
    },
  });

  const renderBidCard = useCallback((bid : Bid) => (
  <BidCard key={bid.id} bid={bid} />
), []);

  const handleSubmitBid = useCallback(async (amount: number, auctionId: string) => {
  const bidToSend = {
    id: uuidv4(),
    auctionId,
    userId: user.id,
    amount,
    timestamp: new Date(),
  };

  try {
    const savedBid = await createBid(bidToSend);
    addBid({ ...savedBid, user: { id: user.id, name: user.name } });
    setAlert({
      open: true,
      message: t("Bid.successMessage"),
      severity: "success",
    });
  } catch (err) {
    setAlert({
      open: true,
      message: t("Bid.errorMessage") || "Error al enviar la puja.",
      severity: "error",
    });
  }
}, [user.id, user.name, addBid]);

  useEffect(() => {
    if (auctionId) fetchBids(auctionId);
  }, [auctionId]);

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        pb: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {t("Bid.title")}
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          mb: 2,
          backgroundColor: "#fafafa",
        }}
      >
        {bids.map(renderBidCard)}
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
          <Typography>{t("Bid.amount")}</Typography>
          <TextField
            id="amount"
            name="amount"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.amount}
            helperText={formik.touched.amount && formik.errors.amount}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            disabled={selectedAuction?.status !== "actual"}
          />
        </Box>
        <Button type="submit" variant="contained" disabled={selectedAuction?.status !== "actual"}>
          {t("Bid.submit")}
        </Button>
      </form>
      <CustomAlert
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
        severity={alert.severity}
      />
    </Container>
  );
}
