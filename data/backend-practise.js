//creates a new HTTP message to send to the backend , message = request
const xhr = new XMLHttpRequest();
//Get is used to get some information from the computer

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
xhr.open("GET", "https://supersimplebackend.dev");

//this creates a new message and sends it over the internet to located url
xhr.send();
