import { NETFLIX_LOGO_URL, USER_PROFILE_LOGO_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const Browse = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        console.log(error);
      });
  };
  return (
    <div>
      <div id="loggedin-logo" className="absolute left-11 w-35 ">
        <img src={NETFLIX_LOGO_URL} alt="Netflix logo" />
      </div>
      <div
        id="user-profile-logo"
        className="absolute top-4 right-17 w-8\9 rounded overflow-hidden cursor-pointer"
        onClick={() => {
          handleLogout();
        }}
      >
        <img
          src={USER_PROFILE_LOGO_URL}
          alt="User profile logo"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Browse;
