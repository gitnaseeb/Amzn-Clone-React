import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import CheckOutProduct from "./CheckOutProduct";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "./reducer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/Payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("secret is", clientSecret);
  //do all stripe stuffs
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent - payment confirmation

        // db
        // .collection('users')
        // .doc(user?.uid)
        // .collection('orders')
        // .doc(paymentIntent.id)
        // .set({
        //   basket:basket,
        //   amount:paymentIntent.amount,
        //   created:paymentIntent.created
        // })

        if (!paymentIntent || !paymentIntent.id) {
          console.error("Invalid paymentIntent:", paymentIntent);
          return;
        }
        // const userDocRef = doc(db, 'users', user?.uid, 'orders', paymentIntent.id);

        // setDoc(userDocRef, {
        //   basket: basket,
        //   amount: paymentIntent.amount,
        //   created: paymentIntent.created
        // })

        // try {
        //   const userDocRef = addDoc(
        //     collection(db, "users", user?.uid, "orders", paymentIntent.id),
        //     {
        //       basket: basket,
        //       amount: paymentIntent.amount,
        //       created: paymentIntent.created,
        //     }
        //   );
        // } catch (e) {
        //   console.log("error >>>", e);
        // }



        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };
  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any error as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment_container">
        <h1>CheckOut {<Link to="/checkout">({basket?.length} items)</Link>}</h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 Alexander Lane</p>
            <p>DownTown London, UK</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items And Delivery</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_price_container">
                <strong>
                  <h3>Order Total</h3>
                  <NumericFormat
                    className="numberformat"
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                  />
                </strong>
                <button disabled={processing || disabled || succeeded}>
                  <span>
                    {processing ? (
                      <h3 className="process_btn">Processing</h3>
                    ) : (
                      "Buy Now"
                    )}
                  </span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
