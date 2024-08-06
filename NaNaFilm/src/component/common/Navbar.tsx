import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setFavMovies,
  setIsSearch,
  setLoading,
  setMovies,
} from "../../redux/slices/movieSlice";
import { RootState } from "../../redux/store";
import { logout } from "../../services/operations/Authapi";
import {
  fetchFavMovie,
  fetchMovies,
} from "../../services/operations/Moviesapi";
import { Movie } from "../../utils/interface/types";
import Loader from "./Loader";

interface FormValues {
  searchTerm: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const token: string = useSelector(
    (state: RootState) => state.auth.token
  ) as string;
  const loading = useSelector((state: RootState) => state.movies.loading);
  const wholedata = useSelector((state: RootState) => state.movies.Movies);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      dispatch(setLoading(true));
      try {
        const movies = await fetchMovies();
        dispatch(setMovies(movies));

        if (token) {
          const favMoviesRes = await fetchFavMovie(token);
          dispatch(setFavMovies(favMoviesRes?.data.favMovies || []));
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAndSetMovies();
  }, [token, dispatch]);

  const searchMovies = (query: string): Movie[] => {
    if (!query) return wholedata;
    const lowerCaseQuery = query.toLowerCase();

    return wholedata.filter((movie) => {
      const title = movie.title.toLowerCase();
      const plot = movie.plot.toLowerCase();
      return title.includes(lowerCaseQuery) || plot.includes(lowerCaseQuery);
    });
  };

  const onSubmit: SubmitHandler<FormValues> = ({ searchTerm }) => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.length > 0) {
      dispatch(setIsSearch(true));
      const result = searchMovies(trimmedSearchTerm);
      dispatch(setMovies(result));
    } else {
      dispatch(setIsSearch(false));
      dispatch(setMovies(wholedata));
    }
  };

  const handleLoginOrLogout = () => {
    if (currentUser) {
      try {
        dispatch(logout(navigate));
        toast.success("Logout Successfully");
      } catch (err) {
        console.error("Logout failed", err);
      }
    } else {
      navigate("/login");
    }
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      {loading && <Loader />}
      <AppBar position="fixed" color="secondary">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          padding="1rem"
        >
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h1 style={{ margin: 0 }}>NaNaFilm</h1>
              </NavLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              justifyContent={isSmallScreen ? "center" : "flex-start"}
            >
              <form
                onChange={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: isSmallScreen ? "100%" : "20rem",
                }}
              >
                <Controller
                  name="searchTerm"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      label="Search"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        ),
                        sx: {
                          "& input:focus": {
                            backgroundColor: "white",
                          },
                        },
                      }}
                      sx={{
                        "& input": {
                          py: "10px",
                        },
                      }}
                    />
                  )}
                />
              </form>
            </Box>
          </Grid>

          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem
                  button
                  component={NavLink}
                  to="/"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                  button
                  component={NavLink}
                  to="/favmovie"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary="Favorite Movies" />
                </ListItem>
                <ListItem button onClick={handleLoginOrLogout}>
                  <ListItemText primary={currentUser ? "Logout" : "Login"} />
                </ListItem>
              </List>
            </Box>
          </Drawer>

          {!isSmallScreen && (
            <>
              <Grid item xs={6} sm={3} md={2}>
                <Box display="flex" justifyContent="flex-end">
                  <NavLink to="/favmovie" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "black", mx: 1 }}>Favorite</Button>
                  </NavLink>
                </Box>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    onClick={handleLoginOrLogout}
                    sx={{ color: "black", mx: 1 }}
                  >
                    {currentUser ? "Logout" : "Login"}
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
