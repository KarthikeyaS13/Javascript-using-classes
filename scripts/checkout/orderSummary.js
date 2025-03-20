import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = ""; //to combine generated html together

  cart.forEach((cartItem) => {
    const productId = cartItem.productId; //to get the matching product v r connecting the id

    let matchingProduct = getProduct(productId);

    /*let matchingProduct; //to save the matching product that we get from productId

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });*/
    //getting delivery option id out from the cart
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);
    //what above function does
    /*let deliveryOption;
    //to save the matching id that we get from delivery option id

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });*/
    //calculating the delivery date

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    //js-cart-item-container and js-product-quantity-${matchingProduct.id} are for testing purpose
    cartSummaryHTML += ` 
  <div class="cart-item-container js-cart-item-container  js-cart-item-container-${
    matchingProduct.id
  }">
  <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity 
        js-product-quantity-${matchingProduct.id}">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" 
          data-product-id = "${matchingProduct.id}">
            
          </span>
          <span class="delete-quantity-link js-delete-link-${
            matchingProduct.id
          } link-primary js-delete-link" data-product-id = "${
      matchingProduct.id
    }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)};
      </div>
    </div>
  </div>
  `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    //cart item to make an input button checked for an radio button  & matching product parameter bcoz we r using matching product inside
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
      //used to check that matches the id in the cart it will be checked

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      //to get all the delivery options radio buttons in web page and we can select 1 of them & adding event listeners js-delivery-option to run the funnction
      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}"> 
        <input type="radio" ${
          isChecked ? "checked" : ""
        } class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  //for all the delete buttons so v r selcting all
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      //when ever we delete a produuct v need to update the prices so v r regenerating the page to update the values

      renderPaymentSummary();
    });
  });

  /*adding event listeners js-delivery-option to run the funnction when ever we click the radio button it changes the date and put it on the page dynamically*/

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary(); //updating using the function updating data and regenerating all the HTML

      //when ever v update delivery options it needs to update in the payment summary section
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });
}
