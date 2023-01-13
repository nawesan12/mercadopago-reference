import { useEffect, useContext } from 'react'
import { TurnoContext, UserContext } from '@context/context'

// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

export default function Page() {

  const { turno } = useContext(TurnoContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchCheckout = async () => {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          turno
        }),
      })
      const data = await response.json()
  
      console.log(data.global)

      if(data.global) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://sdk.mercadopago.com/js/v2'
        script.setAttribute('data-preference-id', data.global)
        document.body.appendChild(script)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
          locale: 'es-AR'
        })

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

    fetchCheckout()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="cho-container"></div>
    </>
  )
}