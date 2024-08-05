import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { setCurrentUser, setToken } from "../../redux/slices/authSlice";
import { setFavMovies } from "../../redux/slices/movieSlice"; // Actualizado
import { LoginResponse, User } from "../../utils/interface/types";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { SIGNUP_API, LOGIN_API } = endpoints;

interface SignUpResponse {
  data: {
    success: boolean;
    message: string;
  };
}

export const login = (
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: Dispatch<any>) => {
    try {
      const response: LoginResponse = await apiConnector({
        method: "POST",
        url: LOGIN_API,
        bodyData: { email, password },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const user: User = response.data.user;
      const token: string = response.data.token;
      dispatch(setCurrentUser(user));
      dispatch(setToken(token));
      dispatch(setFavMovies(user.favMovies || [])); // Actualizado
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
};

export const signUp = (
  name: string,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  return async (_dispatch: Dispatch<any>) => {
    try {
      const response: SignUpResponse = await apiConnector({
        method: "POST",
        url: SIGNUP_API,
        bodyData: { name, email, password },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Signup failed");
      } else {
        toast.error("An unexpected error occurred");
      }
      navigate("/signup");
    }
  };
};

export const logout = (navigate: NavigateFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (dispatch: Dispatch<any>) => {
    try {
      dispatch(setToken(null));
      dispatch(setCurrentUser(null));
      dispatch(setFavMovies([])); // Actualizado
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
};
