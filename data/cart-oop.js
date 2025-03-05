//In object oriented programming we show all the data& functions in objects so we move all oof them in object
// we can not export variables in objects :- export let cart;

//in this file we have moved all the code into an objects but in cart.js there is a clear comments on how the code runs

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    //re-running the cart function
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      //if there is already an item in cart we need to increase the quantity

      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveToStorage(); //when ever we update thecart we save to storage
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart; //assigning newCart to cart
      this.saveToStorage(); //when ever we update thecart we save to storage
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      //loop throught the cart and find product and update delivery optionId of the product
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
    //create new array loop  it add each product to new array except this productId

    //updating the cart delivery option-id whenever we changes the delivery-option in checkout page
    //productId for product to update & deliveryOptionId to update Delivery option
  };

  return cart;
}
const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();

//we have created an another object by using the function of first object which is for used in amazon business, business cart works same as normal cart we hace copied and modified some changes like cart-oop to cart-business to avoid naming conflicts
//easy to create multiple objects
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
