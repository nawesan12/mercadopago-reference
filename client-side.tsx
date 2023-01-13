import { useEffect, useContext } from 'react'
import { TurnoContext, UserContext } from '@context/context'

// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

export default function MPButton() {
  const { turno } = useContext(TurnoContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          turno
        }),
      })
      const data = await res.json()

      // data.global is the ID that MP returns from the API, it comes from our backend route
      if(data.global) {
        const script = document.createElement('script') // Here we create the empty script tag
        script.type = 'text/javascript' // The type of the script
        script.src = 'https://sdk.mercadopago.com/js/v2' // The link where the script is hosted
        script.setAttribute('data-preference-id', data.global) // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script) // Here we append it to the body of our page

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        
        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
        const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
          locale: 'es-AR'
        })

        // The ".checkout" is the function that creates the connection between the button and the platform
        mp.checkout({
          preference: {
            id: data.global
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          }
        });
      }
    }

    // Here we just execute the function
    fetchCheckout()
    //eslint-disable-next-line
  }, [])

  return <div className="cho-container"></div>
}
