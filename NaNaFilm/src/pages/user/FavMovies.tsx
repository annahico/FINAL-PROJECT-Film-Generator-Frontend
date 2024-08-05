import { Grid, Typography } from "@mui/material";
import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../component/common/MovieCard";
import { setFavMovies } from "../../redux/slices/movieSlice";
import { RootState } from "../../redux/store";
import { fetchFavMovie } from "../../services/operations/Moviesapi";
import { Movie } from "../../utils/interface/types";

const FavMovies = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token) as string;

  useEffect(() => {
    const fetchAndDispatchMovies = async () => {
      try {
        const res = await fetchFavMovie(token);

        if (res && Array.isArray(res.favMovies)) {
          dispatch(setFavMovies(res.favMovies || []));
        } else {
          dispatch(setFavMovies([])); // Manejo adecuado si `res` o `res.favMovies` es nulo o indefinido
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        dispatch(setFavMovies([])); // Manejo del error
      }
    };

    fetchAndDispatchMovies();
  }, [dispatch, token]);

  const favMovies = useSelector((state: RootState) => state.movies.favMovies);

  return (
    <Grid container spacing={2} sx={{ marginTop: "5px" }}>
      {favMovies.length > 0 ? (
        favMovies.map((ele: Movie, index: Key) => (
          <Grid key={index} item xs={12}>
            <MovieCard
              Title={ele.title}
              Poster={ele.poster}
              Ratings={ele.ratings[0]?.Value || "N/A"} // Manejo del caso en que Ratings puede estar vacío
              Plot={ele.plot}
              Year={ele.year}
              _id={ele._id}
            />
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Typography variant="h6" align="center">
            You Don't Have Any Favorite Movies
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default FavMovies;
