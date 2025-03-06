import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

//import "../data/cart-class.js";

renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader(); // because whenever we update something we need to refresh the page to see the interaction so we are just running the page by uding a function

//we r loading the function here bcoz  our checkout.html is actually loading from this script file

import "../data/backend-practise.js";
