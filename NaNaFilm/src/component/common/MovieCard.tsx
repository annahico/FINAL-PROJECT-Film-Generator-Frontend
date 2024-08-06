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
import React from "react";

interface MovieCardProps {
  Title: string;
  Poster: string;
  Ratings: string;
  Plot: string;
  Year: string;
  _id: string;
}

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

const MovieCard: React.FC<MovieCardProps> = ({
  Title,
  Poster,
  Ratings,
  Plot,
  Year,
}) => {
  return (
    <StyledCard>
      <StyledCardMedia image={Poster} title={Title} />
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="action" />
        </IconButton>
      </CardContent>
    </StyledCard>
  );
};

export default MovieCard;
