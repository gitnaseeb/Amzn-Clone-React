import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./Header.css";
import amazon_PNG11 from "./assests/amazon_PNG11.png";
import { Link } from "react-router-dom";
import Home from "./Home";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={amazon_PNG11}></img>
      </Link>
      <div className="header_search">
        <input className="header_search_input" type="text"></input>
        <SearchIcon className="header_searchIcon"></SearchIcon>
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_opt1">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header_opt2">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link to='/orders'>
        <div className="header_option">
          <span className="header_opt1">Returns</span>
          <span className="header_opt2">& Orders</span>
        </div>
        </Link>
        <div className="header_option">
          <span className="header_opt1">Yours</span>
          <span className="header_opt2">Prime</span>
        </div>
        <Link to="/CheckOut">
          <div className="header_basketOpt">
            <ShoppingBasketIcon />
            <span className="header_opt2 header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
