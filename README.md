# Ads.Not.Dead — sitio estático

`index.html` es autocontenido (sin build). Súbelo a un repo de GitHub tal cual.

## Envío del formulario de contacto

El formulario ya funciona sin configurar nada: abre WhatsApp y un correo (`mailto:`) prellenados
al enviar. Eso corre en cualquier hosting, incluyendo GitHub Pages.

Si al pasar el repo a **Vercel** quieres que el formulario también envíe el correo desde el
servidor (sin depender del cliente de correo del visitante), ya incluí `api/contact.js`
(función serverless de Vercel, usa [Resend](https://resend.com) para enviar el email).

Pasos en Vercel:
1. Crea una cuenta gratis en resend.com y genera un API key.
2. En el proyecto de Vercel → Settings → Environment Variables, agrega:
   - `RESEND_API_KEY` = tu api key de Resend
   - `CONTACT_TO_EMAIL` = osvaldo@adsnotdead.digital (opcional, ya es el default)
3. Redeploy. El endpoint queda disponible en `/api/contact`.

Sin esas variables configuradas, `api/contact.js` simplemente no se usa — el envío por
WhatsApp/mailto sigue funcionando igual.
