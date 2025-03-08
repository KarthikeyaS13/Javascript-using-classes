import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  //done is a function provided by jasmine when we add done as the parameter beforeall will not go automatically for  the next step now it will wait and only go to nextstep when we call the done function

  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });

    //if we dont call done it is going to wait forever and dont go into next step
    //done lets us control when to go to the next step
    //v wait loadproducts() to finish and then goto the next steps
  });
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
  <div class="js-order-summary"></div>
  <div class="js-payment-summary"></div>
`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]); //as json takes string
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1} `).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector(".js-test-container").innerHTML = "";
  });
});
