import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
//time stamp 16:27:20
describe("test suite: add to cart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]); //as json takes string
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });
  it("adds a new product to the cart", () => {
    //cart doesnt start as empty always so we need to create a mock to create some fake version and make this fake version to make anything we want for example getting an emoty array
    //spyOn() is a function of jasmine which is a mock
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]); //as json takes string
    });
    loadFromStorage();

    //we have mocked the cart to anempty array and when we add a product to the cart the length will be 1

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);

    //this method tells how many times localStorage.set Item has called in the code above
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    //checks 1st product in the cart is equal to given id
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
