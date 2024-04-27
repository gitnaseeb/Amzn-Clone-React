import CheckOut from "./CheckOut";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, element } from "@stripe/react-stripe-js";
import Orders from "./Orders"; 

const promise = loadStripe(
  'pk_test_51OU63eSAlRICB2lO7lNoHZCSOIN79t7DremLyoSLIMhXkndfalPADbbPvsEaXwDBa1oByex3cUcrZLYxBCxicmz100HFF42IJS'
);
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //this will only run once when the app component loads..
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>", authUser);
      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <CheckOut />
              </>
            }
          ></Route>
          <Route
            path="Payment"
            element={
              <>
                <Elements stripe={promise}>
                  <Header />
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route path="orders" element={
           <Orders></Orders>
          }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
