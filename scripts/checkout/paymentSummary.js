import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

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

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;

    document.querySelector(".js-payment-summary").innerHTML =
      paymentSummaryHTML;
  });
}
