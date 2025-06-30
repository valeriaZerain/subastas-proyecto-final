import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { t } from "i18next";

import { AlertDialog } from "../components/Alert";
import { RegisterUsers } from "../components/RegisterUsersForm";
import { useAuction } from "../hooks/useAuction";
import AuctionList from "../components/AuctionList";

function AdminPanelPage() {
  const {
    openAlert,
    openRegisterAuction,
    handleCloseOk,
    handleCloseAlert,
    handleOpenRegisterAuction,
    handleCloseRegisterAuction,
    formik,
    handleImageUpload,
    auctions,
    handleEditAuction,
    handleOpenAlert,
  } = useAuction();

  return (
    <Container sx={{ ml: 0, mr: 0 }}>
      <AlertDialog
        open={openAlert}
        handleCloseOk={handleCloseOk}
        handleCloseCancel={handleCloseAlert}
        title={t("auction.titleDelete")}
        description={t("auction.descriptionDelete")}
        ok={t("auction.okDelete")}
        cancel={t("auction.cancelDelete")}
      ></AlertDialog>
      <Typography variant="h4" gutterBottom>
        {t("auction.title")}
      </Typography>
      <Box display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={handleOpenRegisterAuction}
        >
          {t("auction.addAuction")}
        </Button>
      </Box>
      <RegisterUsers
        title={t("auction.registerTitle")}
        open={openRegisterAuction}
        onClose={handleCloseRegisterAuction}
        onSubmit={formik.handleSubmit}
      >
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={formik.values.image || "/static/images/avatar/1.jpg"}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <input
            accept="image/*"
            id="upload-photo"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-photo">
            <Button variant="contained" component="span">
              {t("userManagement.photo")}
            </Button>
          </label>
        </Box>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("auction.title")}
        </Typography>
        <TextField
          fullWidth
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("auction.description")}
        </Typography>
        <TextField
          fullWidth
          id="description"
          name="description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("auction.basePrice")}
        </Typography>
        <TextField
          fullWidth
          id="basePrice"
          name="basePrice"
          type="number"
          value={formik.values.basePrice}
          onChange={formik.handleChange}
          error={formik.touched.basePrice && Boolean(formik.errors.basePrice)}
          helperText={formik.touched.basePrice && formik.errors.basePrice}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("auction.startTime")}
        </Typography>
        <TextField
          fullWidth
          id="startTime"
          name="startTime"
          type="datetime-local"
          value={formik.values.startTime}
          onChange={formik.handleChange}
          error={formik.touched.startTime && Boolean(formik.errors.startTime)}
          helperText={formik.touched.startTime && formik.errors.startTime}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("auction.duration")}
        </Typography>
        <TextField
          fullWidth
          id="duration"
          name="duration"
          type="number"
          value={formik.values.duration}
          onChange={formik.handleChange}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("auction.status")}
        </Typography>
      </RegisterUsers>
      <AuctionList
        auctions={auctions}
        updateAuction={handleEditAuction}
        deleteAuction={handleOpenAlert}
      />
    </Container>
  );
}

export default AdminPanelPage;
