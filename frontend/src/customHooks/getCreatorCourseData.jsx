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
        let result = await axios.get(serverUrl + "/api/user/currentuser", {
          withCredentials: true,
        });
        // If successful, user is logged in
        dispatch(setUserData(result.data));
      } catch (error) {
        // If error (including "user doesn't have token"), set userData to null
        dispatch(setUserData(null));

        // Only log actual server errors (500), not auth errors (400/401)
        if (error.response?.status >= 500) {
          console.error("Server error:", error.response.data.message);
        }
        // Silently ignore authentication errors (400/401)
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default getCurrentUser;
