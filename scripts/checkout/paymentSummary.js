import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

//bcoz we need to regenerate the page so we r using a function
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  //for calculating the items
  //1)loop throught the cart
  //2)for each product price * quantity
  //3)Add everything together
  cart.forEach((cartItem) => {
    //by using product id get the full product details
    //getProduct() function  gets the matching product
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    //shipping-costs (loop through the cart for delivery option choosen by user and add shipping cost together)
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
  });

  //total before tax => add productPRiceCents + shipping
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  // 10% tax => multiply by 0.1
  const taxCents = totalBeforeTaxCents * 0.1;

  //calc total

  const totalCents = totalBeforeTaxCents + taxCents;

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
      <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(
            productPriceCents
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(
            shippingPriceCents
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalBeforeTaxCents
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalCents
          )}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        //when we click this button make a request to the backend to create the order
        //making a request to the backend using fetch

        //we need to send some data to the backend
        //(in this case we need to send our cart)
        //to send data in a request we need to use a different type of request POST => lets us send data to backend
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          //headers give more  information about our request
          headers: {
            //tells what type of data v r sending here it is json javascript object
            "Content-Type": "application/json",
          },
          //actual data that we send to the backend
          //we can't send object directly in our request  so we need to convert it into JSON string so  we use JSON.stringify
          body: JSON.stringify({
            //v shld have a cart array in this file and it should be called cart
            cart: cart,
          }),
        });
        //after v send a request v need to wait for the response tocome back ,as v r using await v can save the response in a variable called response
        //teh data that is attached to the response v need to use respone.json() also it is a promise so v use await in frontto wait this to finish before gng 2 next line
        const order = await response.json();
        addOrder(order);
        //v need to save our orders so create order.js in data folder
      } catch (error) {
        console.log("Unexpected error. Try again later");
      }

      //after v create an order,go to the orders page by using window.location.href = ' ' href containes the url at top of the browser
      //if we change the  href property it will change at the top and go  to that page
      window.location.href = "orders.html";
    });
}
