import { Button, Container, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

import { RegisterUsers } from "../components/RegisterUsersForm";
import UsersList from "../components/UsersList";
import { useUserStore } from "../store/userStore";
import { t } from "i18next";
import type { User } from "../interfaces/userInterface";

function UserAdminPage() {
  const [openRegisterUser, setOpenRegisterUser] = useState(false);
  const { users, fetchUsers } = useUserStore();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: ""
    },
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
    },
  })

  const handleOpenRegisterUser = () => setOpenRegisterUser(true);
  const handleCloseRegisterUser = () => {
    setOpenRegisterUser(false);
    formik.resetForm();
    fetchUsers();
  };

  const editUser = async (user: User) => {
    setOpenRegisterUser(true);

    console.log("Edit user:", user);
  }

  const deleteUser = async (userId: string) => {
    console.log("Delete user with ID:", userId);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container  sx={{ml:0, mr:0}}>
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
        open={openRegisterUser}
        onClose={handleCloseRegisterUser}
      />
      <UsersList users={users} editUser={editUser} deleteUser={deleteUser} />
    </Container>
  );
}

export default UserAdminPage;
