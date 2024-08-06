import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../component/common/Loader";
import { setLoading } from "../../redux/slices/movieSlice";
import { RootState } from "../../redux/store";
import { login } from "../../services/operations/Authapi";
import { Logindata } from "../../utils/interface/types";
import { LoginSchema } from "../../utils/schema/userSchema";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.movies.loading);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Logindata>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Logindata> = async (data) => {
    try {
      dispatch(setLoading(true));
      const { email, password } = data;
      await dispatch(
        login(email, password, navigate) as unknown as UnknownAction
      );
      toast.success("Login successfully");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            mt: "2rem",
          }}
        >
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Login
          </Typography>

          <Box
            sx={{
              width: "80%",
              maxWidth: "400px",
              padding: "2rem",
              border: "1px solid #ccc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Login
                </Button>
                <Typography align="center" mt={2} color="black">
                  Do not have an account?{" "}
                  <NavLink
                    to="/signup"
                    style={{ textDecoration: "none", color: "#ff00ff" }}
                  >
                    Register
                  </NavLink>
                </Typography>
              </Box>
            </form>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Login;
