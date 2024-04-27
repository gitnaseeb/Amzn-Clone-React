import React from "react";
import "./SubTotal.css";
import { NumericFormat } from "react-number-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useNavigate } from "react-router-dom";

const SubTotal = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <p>
        SubTotal ({basket.length} item) :
        <strong>
          <NumericFormat
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </strong>
      </p>
      <small className="subtotal_gift">
        <input className="checkbox_input" type="checkbox" />
        This order contains a gift
      </small>
      <button className="checkbox_btn" onClick={(e) => navigate("/Payment")}>
        Proceed to CheckOut
      </button>
    </div>
  );
};

export default SubTotal;
