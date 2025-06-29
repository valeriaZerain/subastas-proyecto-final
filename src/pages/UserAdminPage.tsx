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
import { useEffect, useState } from "react";
import { useFormik } from "formik";

import { RegisterUsers } from "../components/RegisterUsersForm";
import UsersList from "../components/UsersList";
import { useUserStore } from "../store/userStore";
import { registerUser } from "../services/Users";
import { t } from "i18next";
import * as Yup from "yup";

const userSchema = Yup.object({
  username: Yup.string()
    .min(3, t("validation.usernameMin"))
    .max(50, t("validation.usernameMax"))
    .required(t("validation.required")),
  password: Yup.string()
    .min(6, t("validation.passwordMin"))
    .max(50, t("validation.passwordMax"))
    .required(t("validation.required")),
  role: Yup.string().oneOf(["admin", "user"], t("validation.roleInvalid")),
  photoUrl: Yup.string(),
});

function UserAdminPage() {
  const [openRegisterUser, setOpenRegisterUser] = useState(false);
  const { users, fetchUsers } = useUserStore();
  const formik = useFormik({
    initialValues: {
      username: "",
      photoUrl: "",
      role: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values);
        await registerUser(
          values.username,
          values.password,
          values.role,
          values.photoUrl
        );
        formik.resetForm();
        setOpenRegisterUser(false);
        fetchUsers();
        console.log("User registered successfully");
      } catch (error) {
        console.error("Error registering user", error);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("photoUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleOpenRegisterUser = () => setOpenRegisterUser(true);

  const handleCloseRegisterUser = () => {
    formik.resetForm();
    setOpenRegisterUser(false);
    fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    console.log("Delete user with ID:", userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ ml: 0, mr: 0 }}>
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

        <Box mt={2}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("userManagement.photo")}
          </Typography>
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
      </RegisterUsers>
      <UsersList users={users} deleteUser={deleteUser} />
    </Container>
  );
}

export default UserAdminPage;
