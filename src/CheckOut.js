import React from "react";
import "./CheckOut.css";
import ads from "./assests/ads.jpg";
import SubTotal from "./SubTotal";
import { useStateValue } from "./StateProvider";
import CheckOutProduct from "./CheckOutProduct";

function CheckOut() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ads" src={ads}></img>
        <div>
          <h3>Hello,{user?.email}</h3>
          <h2 className="checkout_title">Your Shopping Basket</h2>

          {basket.map((item) => (
            <CheckOutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout_right">
        <SubTotal />
      </div>
    </div>
  );
}

export default CheckOut;
