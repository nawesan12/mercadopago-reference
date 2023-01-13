// This is just the package (installed via npm or yarn) and its types
import mercadopago from "mercadopago"
import type { CreatePreferencePayload, PreferencePayer, PreferenceBackUrl } from 'mercadopago/models/preferences/create-payload.model'

export default function handler(req: Request, res: Response) {
  
  // Here is where we configure our session, setting the access token provided by MP
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  })

  // This is just boilerplate data, but really you'll need to catch the important data that MP asks for below
  const { user, turno } = req.body // or any other info needed

  // Here we create the "Preference", this is the config for the payment
  const preference: CreatePreferencePayload = {
    // This is always true * REQUIRED
    binary_mode: true,
    // The data of the item that the user has to pay for * REQUIRED
    items: [
      {
        title: `${turno.service} - Nombre de la marca`,
        description: `Descripcion del producto`,
        picture_url: "url de imagen",
        quantity: 1 as number,
        currency_id: "currency needed (ARS, USD, etc)",
        unit_price: turno.price as number
      }
    ],
    // Data of the user * REQUIRED
    payer: {
      name: user.name as string,
      surname: user.name.split(" ")[1] ?? "TGB" as string,
      email: user.email as string
    } as PreferencePayer,
    // When the user finishes the payment, depending of the status of the payment he'll be redirected, you gotta put your custom urls
    back_urls: {
      success: "https://success.com",
      failure: "https://failure.com",
      pending: "https://pending.com"
    } as PreferenceBackUrl,
    // This is always "approved"
    auto_return: "approved"
  }
      
  // Here we config the preference, it's like send it to MP and then its API returns a response object.
  // We just need the id from it, so we set the response to { global: response.body.id }. 
  // This will send an object literal where we can access the ID for our frontend button
  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.status(200).json({global: response.body.id})
    })
    .catch((error) => {
      // In an error appears, we'll send the error.
      res.status(500).json({global: error})
    })
}

// IMPORTANT

/*
  This is the only code needed, but you can save in your DB all the data you need.
  If this does not works, check your MP keys, your .env file, or the enviroment variables in your deployment.
  In case of not finding a solution to a supposed error, open an issue in this repo so i'll fix it in the future.
*/
