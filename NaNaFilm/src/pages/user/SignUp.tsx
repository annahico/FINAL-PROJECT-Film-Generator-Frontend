import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../component/common/Loader"; // Ensure you have a Loader component
import { setLoading } from "../../redux/slices/movieSlice";
import { RootState } from "../../redux/store";
import { signUp } from "../../services/operations/Authapi";
import { SignUPdata } from "../../utils/interface/types";
import { RegisterSchema } from "../../utils/schema/userSchema";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.movies.loading);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUPdata>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUPdata> = async (data) => {
    try {
      dispatch(setLoading(true));
      console.log("register", data);
      const { name, email, password } = data;
      dispatch(signUp(name, email, password, navigate) as unknown);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
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
        Registration
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
        {loading ? (
          <Loader /> // Display loader when loading is true
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />
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
                    helperText={errors.password ? errors.password.message : ""}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
              <Typography align="center" mt={2}>
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Login
                </NavLink>
              </Typography>
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default SignUp;
