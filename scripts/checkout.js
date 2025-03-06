import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

//import "../data/cart-class.js";

//call back or a function v run inthe future v dont need to give parameters everytime we can call an anonymous function or a function without a name

//here we are calling from the backend and waiting fort the response then loading the functions
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

renderCheckoutHeader(); // because whenever we update something we need to refresh the page to see the interaction so we are just running the page by uding a function

//we r loading the function here bcoz  our checkout.html is actually loading from this script file

//import "../data/backend-practise.js";
