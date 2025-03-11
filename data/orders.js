export const orders = JSON.parse(localStorage.getItem("orders")) || [];
//if there is nothing in local storage it takes empty array

//to add orders to the array
export function addOrder(order) {
  //unshift will add the most recent object to the top
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
