import * as Yup from "yup";
import { useUserStore } from "../store/userStore";
import { registerUser, updateUser, deleteUser } from "../services/Users";
import type { User } from "../interfaces/userInterface";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { t } from "i18next";

export const useUsers = () => {
  const [openRegisterUser, setOpenRegisterUser] = useState(false);
  const { users, fetchUsers } = useUserStore();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const userSchema = Yup.object({
    username: Yup.string()
      .min(3, t("Validation.usernameMin"))
      .max(50, t("Validation.usernameMax"))
      .required(t("Validation.required")),
    password: Yup.string()
      .min(6, t("Validation.passwordMin"))
      .max(50, t("Validation.passwordMax"))
      .required(t("Validation.required")),
    role: Yup.string().oneOf(["admin", "user"], t("validation.roleInvalid")),
    photoUrl: Yup.string(),
  });

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
        if (editingUser) {
          await updateUser({
            ...editingUser,
            name: values.username,
            password: values.password,
            role: values.role,
            photoUrl: values.photoUrl,
          });
        } else {
          await registerUser(
            values.username,
            values.password,
            values.role,
            values.photoUrl
          );
          console.log("User registered successfully");
        }
        formik.resetForm();
        setEditingUser(null);
        setOpenRegisterUser(false);
        fetchUsers();
      } catch (error) {
        console.error("Error saving user", error);
      }
    },
  });

  const handleOpenRegisterUser = () => setOpenRegisterUser(true);

  const handleCloseRegisterUser = () => {
    formik.resetForm();
    setEditingUser(null);
    setOpenRegisterUser(false);
    fetchUsers();
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    formik.setValues({
      username: user.name,
      password: user.password,
      role: user.role,
      photoUrl: user.photoUrl,
    });
    setOpenRegisterUser(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
    setEditingUser(null);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = (user: User) => {
    setEditingUser(user);
    setOpenAlert(true);
  };
  const handleCloseOk = () => {
    handleDeleteUser(editingUser?.id || "");
    setOpenAlert(false);
    fetchUsers();
  };

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
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
  };
};
