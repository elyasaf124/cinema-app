import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { showTimeSlice } from "./features/showTimeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

export let baseUrl = "";
if (process.env.NODE_ENV === "production") {
  console.log("prod");
  disableReactDevTools();
  baseUrl = "https://cinema-api-rgmg.onrender.com";
} else if (process.env.NODE_ENV === "development") {
  console.log("dev");
  baseUrl = "http://127.0.0.1:3000";
}

const stripePromise = loadStripe(
  "pk_test_51Mo5ZPIAGLB3hRSxiyQtQYgXZ4F5ksdJ4UU8t4eTBZD0LF34WFT1Q04VkEiwnYtEeoeRjBdXeshMCfNnX6lKOPVd00dk0wrThu"
);

export const store = configureStore({
  reducer: {
    showtime: showTimeSlice.reducer,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
