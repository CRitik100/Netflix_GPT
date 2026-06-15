import LoggedInHeader from "../browse/LoggedInHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "../../icons/MenuIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import HomeIcon from "../../icons/HomeIcon";
import CreditCardIcon from "../../icons/CreditCardIcon";
import SecurityIcon from "../../icons/SecurityIcon";
import SettingIcon from "../../icons/SettingIcon";
import OverView from "./OverView";
import Membership from "./Membership";
import Security from "./Security";
import Settings from "./Settings";
import lang from "../../utils/langConstant";

const Account = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState("overview");
  const defLang = useSelector((store) => store.appConfig.defaultLanguage);

  return (
    <div className="bg-black w-screen h-screen">
      <div className="relative z-60 md:z-50 md:pt-20">
        <div className="flex gap-10 p-7 md:p-11 justify-start items-start bg-white md:w-[60%] h-dvh md:h-160 mx-auto rounded-lg">
          <div
            className=" absolute z-60 top-11 left-11 block md:hidden cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <MenuIcon />
          </div>
          <div
            className="absolute top-9 right-11 md:hidden flex gap-2 items-center cursor-pointer text-gray-500 font-semibold hover:bg-gray-200 rounded p-2 md:my-2 "
            onClick={() => {
              navigate("/browse");
            }}
          >
            <ArrowLeftIcon />
            <span>{lang[defLang].accountBackButton}</span>
          </div>
          {isMenuOpen && (
            <div className="absolute inset-0 z-10 bg-black/50"></div>
          )}

          <div
            className={`absolute z-20 md:relative w-[60%] h-[90%] p-3 md:w-1/3 md:h-full pt-13 md:pt-0 bg-amber-50 md:bg-white rounded-lg border border-gray-300 ${isMenuOpen ? "block" : "hidden"} md:block`}
          >
            <ul className="text-gray-500 font-semibold flex flex-col gap-5">
              <li
                className={`flex gap-2 cursor-pointer p-2 hover:bg-gray-200 rounded md:mt-4 ${activeOption === "overview" ? "bg-gray-200" : ""}`}
                onClick={() => setActiveOption("overview")}
              >
                <HomeIcon />
                <span>{lang[defLang].overView}</span>
              </li>
              <li
                className={`flex gap-2 cursor-pointer p-2 hover:bg-gray-200 rounded ${activeOption === "membership" ? "bg-gray-200" : ""}`}
                onClick={() => setActiveOption("membership")}
              >
                <CreditCardIcon />
                <span>{lang[defLang].membership}</span>
              </li>
              <li
                className={`flex gap-2 cursor-pointer p-2 hover:bg-gray-200 rounded ${activeOption === "security" ? "bg-gray-200" : ""}`}
                onClick={() => setActiveOption("security")}
              >
                <SecurityIcon />
                <span>{lang[defLang].security}</span>
              </li>
              <li
                className={`flex gap-2 cursor-pointer p-2 hover:bg-gray-200 rounded ${activeOption === "settings" ? "bg-gray-200" : ""}`}
                onClick={() => setActiveOption("settings")}
              >
                <SettingIcon />
                <span>{lang[defLang].settings}</span>
              </li>
            </ul>
          </div>
          <div className="w-full m-4 md:w-2/3 ">
            <div className="mt-11 md:mt-0">
              {activeOption === "overview" && <OverView />}
              {activeOption === "membership" && <Membership />}
              {activeOption === "security" && <Security />}
              {activeOption === "settings" && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
