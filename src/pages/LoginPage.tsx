import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { t } from "i18next";

import {CustomAlert} from "../components/CustomAlert";
import { useLogin } from "../hooks/useLogin";

function LoginPage() {
  const { formik, openSnackBar, closeSnackBars } = useLogin();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CustomAlert
        open={openSnackBar}
        onClose={closeSnackBars}
        message={t("LoginPage.errorMessage")}
        severity="error"
      />
      <Card sx={{ boxShadow: 3, maxWidth: 400 }}>
        <CardContent
          sx={{
            padding: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              marginY: 2,
            }}
            variant="h5"
            component="h1"
            gutterBottom
          >
            {t("LoginPage.title")}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="input-username-textfield"
              label={t("LoginPage.userName")}
              type="text"
              name="username"
              fullWidth
              sx={{ marginY: 1 }}
              value={formik.values.username}
              onChange={formik.handleChange}
              helperText={formik.touched.username && formik.errors.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
            />
            <TextField
              id="input-password-textfield"
              label={t("LoginPage.password")}
              type="password"
              name="password"
              fullWidth
              variant="standard"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                marginY: 1,
              }}
            />
            <Button
              sx={{
                marginTop: 2,
                width: "100%",
              }}
              variant="contained"
              type="submit"
            >
              {t("LoginPage.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
