// Vercel serverless function — POST /api/contact
// Requires env vars in Vercel: RESEND_API_KEY (from resend.com), optionally CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, phone, brand } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Ads.Not.Dead <onboarding@resend.dev>',
        to: process.env.CONTACT_TO_EMAIL || 'osvaldo@adsnotdead.digital',
        subject: `Nuevo contacto — ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || '-'}\nMarca: ${brand || '-'}`,
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(502).json({ error: t });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
