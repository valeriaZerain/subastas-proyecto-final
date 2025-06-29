import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUser } from "../services/Users";
import { useAuth } from "../contexts/authContext";
import { t } from "i18next";

export const useLogin = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { login } = useAuth();
  const { setUser, setToken } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/home");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t("validation.usernameMin"))
        .max(50, t("validation.usernameMax"))
        .required(t("validation.required")),
      password: Yup.string()
        .min(6, t("validation.passwordMin"))
        .max(50, t("validation.passwordMax"))
        .required(t("validation.required")),
    }),
    onSubmit: async (values) => {
      try {
        const user = await getUser(values.username, values.password);
        if (user.length > 0) {
          setUser(user[0]);
          setToken(user[0].token);
          login(user[0].rolelogin === "admin");
          goToDashboard();
        } else {
          setOpenSnackBar(true);
        }
      } catch (error) {
        console.error(t("LoginPage.error"), error);
        setOpenSnackBar(true);
      }
    },
  });

  const closeSnackBars = () => {
    setOpenSnackBar(false);
  };

  return {
    formik,
    openSnackBar,
    closeSnackBars,
  };
};
