import { useState, useEffect } from "react";
import CineVerseLogo from "../logIn/CineVerseLogo";
import { USER_PROFILE_LOGO_URL } from "../../utils/constant";
import UserProfile from "./UserProfile";
import SearchIcon from "../../icons/SearchIcon";
import { useLocation, useNavigate } from "react-router-dom";
import BookMark from "../../icons/BookMark";
import ToolTip from "./TootTip";

const LoggedInHeader = ({ AIWindow }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between items-start py-4 pr-4 pl-8 absolute w-full z-60 box-border">
      <div
        id="loggedin-logo"
        className=" w-35 cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        <CineVerseLogo />
      </div>
      <div
        className={`flex items-center gap-7 ${location.pathname === "/browse" ? "block" : "hidden"}`}
      >
        <div
          id="search"
          className="text-white mt-2.5 cursor-pointer relative"
          onClick={() => {
            AIWindow();
          }}
        >
          <SearchIcon />
         <ToolTip text="A.I Search" />
        </div>
        <div
          id="favourite"
          className="text-white mt-3 cursor-pointer relative"
          onClick={() => navigate("/browse/favourite")}
        >
          <BookMark />
          <ToolTip text="Favourite" />
        </div>
        <div
          id="user-profile"
          className=" flex flex-col justify-center items-end gap-1 cursor-pointer mr-3 relative"
          onClick={() => setShowProfile(!showProfile)}
          onMouseEnter={() => setShowProfile(true)}
          onMouseLeave={() => setShowProfile(false)}
        >
          <img
            src={USER_PROFILE_LOGO_URL}
            alt="User profile logo"
            className="w-8\9 rounded mt-3"
          />
          <div className="absolute top-11 right-0 w-max">
            {showProfile && <UserProfile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInHeader;
