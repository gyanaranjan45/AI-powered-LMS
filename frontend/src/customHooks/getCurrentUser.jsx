import { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const getCurrentUser = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if there's a token in cookies before making request
        const hasToken = document.cookie
          .split(";")
          .some((cookie) => cookie.trim().startsWith("token="));

        if (!hasToken) {
          // No token found, set userData to null silently
          dispatch(setUserData(null));
          return;
        }

        let result = await axios.get(serverUrl + "/api/user/currentuser", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("Error fetching current user:", error);
        dispatch(setUserData(null));

        // Don't show error for authentication issues
        if (error.response?.status !== 400 && error.response?.status !== 401) {
          console.error("Server error:", error.response?.data?.message);
        }
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default getCurrentUser;
