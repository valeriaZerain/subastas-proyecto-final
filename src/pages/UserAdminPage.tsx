import {
  Button,
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";

import { RegisterUsers } from "../components/RegisterUsersForm";
import UsersList from "../components/UsersList";

import { t } from "i18next";
import { AlertDialog } from "../components/Alert";
import { useUsers } from "../hooks/useUsers";

function UserAdminPage() {
  const {
    openAlert,
    handleCloseOk,
    handleCloseAlert,
    handleOpenRegisterUser,
    openRegisterUser,
    handleCloseRegisterUser,
    formik,
    handleImageUpload,
    users,
    handleEditUser,
    handleOpenAlert,
  } = useUsers();
  return (
    <Container sx={{ ml: 0, mr: 0 }}>
      <AlertDialog
        open={openAlert}
        handleCloseOk={handleCloseOk}
        handleCloseCancel={handleCloseAlert}
        title={t("userManagement.titleDelete")}
        description={t("userManagement.descriptionDelete")}
        ok={t("userManagement.okDelete")}
        cancel={t("userManagement.cancelDelete")}
      ></AlertDialog>
      <Typography variant="h4" gutterBottom>
        {t("userManagement.title")}
      </Typography>
      <Box display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={handleOpenRegisterUser}
        >
          {t("userManagement.addUser")}
        </Button>
      </Box>
      <RegisterUsers
        title={t("userManagement.registerUserTitle")}
        open={openRegisterUser}
        onClose={handleCloseRegisterUser}
        onSubmit={formik.handleSubmit}
      >
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={formik.values.photoUrl || "/static/images/avatar/1.jpg"}
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
          {t("userManagement.name")}
        </Typography>
        <TextField
          fullWidth
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("userManagement.password")}
        </Typography>
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 2 }}
        />

        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("userManagement.role")}
        </Typography>
        <Select
          fullWidth
          id="role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="admin">{t("userManagement.admin")}</MenuItem>
          <MenuItem value="user">{t("userManagement.user")}</MenuItem>
        </Select>
      </RegisterUsers>
      <UsersList
        users={users}
        updateUser={handleEditUser}
        deleteUser={handleOpenAlert}
      />
    </Container>
  );
}

export default UserAdminPage;