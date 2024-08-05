import {
  Button,
  Card,
  CardContent,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/movieSlice";
import { RootState } from "../../redux/store";
import { addComment, fetchMovies } from "../../services/operations/Moviesapi";
import { Comment, Movie } from "../../utils/interface/types";
import Loader from "./Loader";

interface CommentFormInput {
  text: string;
  rating: string;
}

const MovieDetailCard: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const token: string = useSelector(
    (state: RootState) => state.auth.token
  ) as string;
  const loading = useSelector((state: RootState) => state.movies.loading);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [text, setText] = useState<string>("");
  const [userRating, setUserRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { _id } = useParams<{ _id: string }>();

  const { register, handleSubmit, reset, setValue } =
    useForm<CommentFormInput>();

  const handleCommentSubmit: SubmitHandler<CommentFormInput> = async (
    formData
  ) => {
    setError(null);
    const { text, rating } = formData;

    if (!text.trim() || !rating.trim()) {
      setError("Both comment and rating are required.");
      return;
    }

    dispatch(setLoading(true));
    try {
      await addComment(token, _id!, text, rating);
      const moviesData = await fetchMovies();
      setMovies(moviesData || []); // Si moviesData es null, asigna un array vacío
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    } finally {
      setText("");
      setUserRating(null);
      dispatch(setLoading(false));
    }
    reset();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const moviesData = await fetchMovies();
        setMovies(moviesData || []); // Si moviesData es null, asigna un array vacío
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to fetch movie details");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const movie = movies.find((item) => item._id === _id);
  const commentArray = movie?.commentIds as Comment[];

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleRatingChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number | null
  ) => {
    setUserRating(newValue);
    setValue("rating", newValue?.toString() || "");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <img
                  src={movie?.poster}
                  alt={movie?.title}
                  style={{ maxWidth: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  {movie?.title} ({movie?.year})
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Rated:</strong> {movie?.rated}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Released:</strong> {movie?.released}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Runtime:</strong> {movie?.runtime}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Genre:</strong> {movie?.genre}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Director:</strong> {movie?.director}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Writer:</strong> {movie?.writer}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Actors:</strong> {movie?.actors}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Plot:</strong> {movie?.plot}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Language:</strong> {movie?.language}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Country:</strong> {movie?.country}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Awards:</strong> {movie?.awards}
                </Typography>

                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "1rem" }}
                >
                  Comments:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Your Rating:</strong>{" "}
                  {userRating !== null ? userRating : "Not rated yet"}
                </Typography>

                {currentUser && (
                  <form
                    onSubmit={handleSubmit(handleCommentSubmit)}
                    style={{ marginTop: "1rem" }}
                  >
                    <TextField
                      {...register("text", { required: true })}
                      label="Add a comment"
                      variant="outlined"
                      fullWidth
                      value={text}
                      onChange={handleCommentChange}
                    />
                    <Rating
                      value={userRating || 0}
                      onChange={handleRatingChange}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "1rem" }}
                    >
                      Submit Comment
                    </Button>
                  </form>
                )}

                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    style={{ marginTop: "1rem" }}
                  >
                    {error}
                  </Typography>
                )}

                {commentArray && commentArray.length > 0 ? (
                  commentArray.map((comment, index) => (
                    <div key={index} style={{ marginTop: "1rem" }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>{comment.userId.name}:</strong>
                        {"\n"}
                        Comment: {comment.text}
                        {"\n"}
                        Rating: {comment.rating}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginTop: "1rem" }}
                  >
                    No comments available.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MovieDetailCard;
