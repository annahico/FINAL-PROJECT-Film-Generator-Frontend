import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavMovies } from "../../redux/slices/movieSlice";
import { RootState } from "../../redux/store";
import {
  addFavMovie,
  removeFavMovie,
} from "../../services/operations/Moviesapi";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const StyledCardMedia = styled(CardMedia)({
  width: 200,
  height: 300,
  objectFit: "cover",
});

interface MovieCardProps {
  Title: string;
  Poster: string;
  Ratings: string;
  Plot: string;
  Year: string;
  _id: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  Title,
  Poster,
  Ratings,
  Plot,
  Year,
  _id,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const favMovies = useSelector((state: RootState) => state.movies.favMovies);
  const token = useSelector((state: RootState) => state.auth.token) as string;
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favMovies.some((movie) => movie._id === _id) || false);
  }, [favMovies, _id]);

  const toggleFavorite = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      if (!isFavorite) {
        await addFavMovie(token, _id);
      } else {
        const updatedFavMovies = await removeFavMovie(token, _id); // Ahora es siempre Movie[]
        dispatch(setFavMovies(updatedFavMovies)); // Actualizado
      }
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleShowMovieDetailCard = () => {
    navigate(`/movie-details/${encodeURIComponent(_id)}`);
  };

  return (
    <StyledCard>
      <StyledCardMedia image={Poster} title={Title} />
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          onClick={handleShowMovieDetailCard}
          style={{ cursor: "pointer" }}
        >
          {Title}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {Plot.length > 150 ? `${Plot.substring(0, 150)}...` : Plot}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Year: {Year}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Rating: {Ratings}
            </Typography>
          </Grid>
        </Grid>
        <IconButton onClick={toggleFavorite} aria-label="add to favorites">
          <FavoriteIcon color={isFavorite ? "primary" : "action"} />
        </IconButton>
      </CardContent>
    </StyledCard>
  );
};

export default MovieCard;
