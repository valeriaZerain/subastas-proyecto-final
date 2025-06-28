import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUser } from "../services/Auth";
import { useAuth } from "../contexts/authContext";

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
        .min(3, "El nombre de usuario menos de 3 dígitos")
        .max(50, "El nombre de usuario debe tener menos de 50 dígitos")
        .required("Nombre de usuario requerido"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 dígitos")
        .max(50, "La contraseña debe tener menos de 50 dígitos")
        .required("Contraseña requerida"),
    }),
    onSubmit: async (values) => {
      try {
        const user = await getUser(values.username, values.password);
        if (user.length > 0) {
          setUser(user[0]);
          setToken(user[0].token);
          login(true);
          goToDashboard();
        } else {
          setOpenSnackBar(true);
        }
      } catch (error) {
        console.error("No se encontro el usuario", error);
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
