import mercadopago from "mercadopago"
import type { CreatePreferencePayload, PreferencePayer, PreferenceBackUrl } from 'mercadopago/models/preferences/create-payload.model'

export default function handler(req: Request, res: Response) {

  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN,
  })

  const { user, turno } = req.body // or any other info needed

  const preference: CreatePreferencePayload = {
    binary_mode: true,
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
    payer: {
      name: user.name as string,
      surname: user.name.split(" ")[1] ?? "TGB" as string,
      email: user.email as string
    } as PreferencePayer,
    back_urls: {
      success: "https://success.com",
      failure: "https://failure.com",
      pending: "https://pending.com"
    } as PreferenceBackUrl,
    auto_return: "approved"
  }
      
  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.status(200).json({global: response.body.id})
    })
    .catch((error) => {
      res.status(500).json({global: error})
    })
}
