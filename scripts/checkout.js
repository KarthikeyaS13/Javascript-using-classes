import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

//import "../data/cart-class.js";

/*loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});*/

//we can run multiple promises at the same time by using promise.all() we need to give array of promises

async function loadPage() {
  //load the products by using await it waits for the function to finish then load the cart
  try {
    await loadProductsFetch();

    //now we wait for this promise to finish before going to next line

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  } catch (error) {
    console.log("Unexpected error. Please try again later");
  }

  //finally when v load the products & load the cart we render the page
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();

/*Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});*/

//call back or a function v run inthe future v dont need to give parameters everytime we can call an anonymous function or a function without a name

//resolve tells us  when to go to the next step so we olaced here to say than after loading products we need to go to next step from here

/*new Promise((resolve) => {
  loadProducts(() => {
    
    resolve();
  });
})
  .then(() => {
    //here after loadProducts() v r gng 2 nxt step
    //v don't have resolve in then function so we are creating a new promise
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    //here after loading the cart the we r loading the next steps
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
*/
/*loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});*/
//here we are calling from the backend and waiting fort the response then loading the functions

// because whenever we update something we need to refresh the page to see the interaction so we are just running the page by uding a function

//we r loading the function here bcoz  our checkout.html is actually loading from this script file

//import "../data/backend-practise.js";
