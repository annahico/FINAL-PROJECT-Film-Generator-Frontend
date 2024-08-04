import { Grid } from "@mui/material";
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
        Movies.map((ele, index) => (
          <Grid key={index} item xs={12}>
            <MovieCard
              Title={ele.Title}
              Poster={ele.Poster}
              Ratings={ele.Ratings[1]?.Value || "N/A"}
              Plot={ele.Plot}
              Year={ele.Year}
              _id={ele._id}
            />
          </Grid>
        ))
      ) : (
        <div>No movies available.</div>
      )}
    </Grid>
  );
};

export default ShowMovies;
