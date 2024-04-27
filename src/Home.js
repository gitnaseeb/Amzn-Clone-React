import React from "react";
import Amz from "./assests/Amz.jpg";
import "./Home.css";
import Product from "./Product";
import lean_startup from "./assests/lean_startup.jpg";
import baking from "./assests/baking.jpg";
import ipad from "./assests/ipad.jpg";
import led from "./assests/led.jpg";
import watch from "./assests/watch.jpg";
import alexa from "./assests/alexa.jpg";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={Amz}></img>
        <div className="home_row">
          <Product
            id="123"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={29.99}
            image={lean_startup}
            rating={5}
          />
          <Product
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={29.99}
            image={ipad}
            rating={3}
          />
        </div>
        <div className="home_row">
          <Product
            id="456"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, 5 Litre Glass Bowl"
            price={89.99}
            image={baking}
            rating={4}
          />
          <Product
            id="789"
            title="TSamsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={129.99}
            image={watch}
            rating={2}
          />
          <Product
            id="0001"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa"
            price={899.99}
            image={alexa}
            rating={3}
          />
        </div>
        <div className="home_row">
          <Product
            id="0002"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1999.99}
            image={led}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
