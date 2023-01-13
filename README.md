# Mercado Pago Reference Integration

## Introduction

This is a reference integration for Mercado Pago. It is a simple example of how to integrate Mercado Pago with a simple web application.

## Steps 

1. First you have to install mercadopago via npm or yarn.
2. Then you have to obtain your public key and access token from Mercado Pago, for this check the documentation: https://www.mercadopago.com.ar/developers/es/docs
3. In the API code of your app, copy and paste the server-side.ts file and use it like a route of your own. (i.e.: http://localhost:3000/api/checkout)
4. In the client side, use the client-side.tsx file, if you want you can copy the exact component, but keep in mind that you need some important data for sending to the API.

## Explanation

The backend route needs some specific data about the payment, like the user's name, the details of the item, etc. These fields are REQUIRED. 
Once the preference is set, through the mercadopago package we are gonna try to create that preference, if everything goes fine, we we'll send the ID of the payment that the response gives us.

Then in the front, the idea is to receive that ID once the page is loaded, that is why we are using the useEffect. Once the data and the ID is received, we'll be able to press the "Pay" button and Mercado Pago will do his magic. It's important to keep the container with that name, and the PUBLIC_KEY and ACCESS_TOKEN correct in our .env file.

## Requirements

* Frontend in HTML, CSS and Javascript, or any other framework you want to use
* Backend in Node

