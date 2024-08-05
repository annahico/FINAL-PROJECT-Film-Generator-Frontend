// ShowMovies.tsx

import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../component/common/Loader";
import MovieCard from "../../component/common/MovieCard";
import { RootState } from "../../redux/store";

interface Movie {
  Title: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Plot: string;
  Year: string;
  _id: string;
}

const ShowMovies: React.FC = () => {
  const Movies = useSelector(
    (state: RootState) => state.movies.Movies as unknown as Movie[]
  );
  const loading = useSelector((state: RootState) => state.movies.loading);

  return loading ? (
    <Loader />
  ) : (
    <Grid container spacing={2} sx={{ marginTop: "5px" }}>
      {Movies.length > 0 ? (
        Movies.map((movie) => (
          <Grid key={movie._id} item xs={12} sm={6} md={4}>
            <MovieCard
              Title={movie.Title}
              Poster={movie.Poster}
              Ratings={movie.Ratings[1]?.Value || "N/A"}
              Plot={movie.Plot}
              Year={movie.Year}
              _id={movie._id}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="h6" align="center" sx={{ width: "100%" }}>
          No films available.
        </Typography>
      )}
    </Grid>
  );
};

export default ShowMovies;
