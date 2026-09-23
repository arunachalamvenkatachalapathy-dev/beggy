import { getKv } from './_kv.js';

// Honest all-India counter. Only real completed simulations are counted.
// `kv` tells you whether the store is actually connected (false = numbers are placeholders).
export default async function handler(req, res) {
  const kv = getKv();
  if (!kv) {
    if (req.method === 'GET' || req.method === 'POST') {
      return res.status(200).json({ ok: true, kv: false, totalSaved: 0, orders: 0 });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  }

  try {
    if (req.method === 'GET') {
      const totalSaved = Number((await kv.get('beggy:totalSaved')) || 0);
      const orders = Number((await kv.get('beggy:orders')) || 0);
      return res.status(200).json({ ok: true, kv: true, totalSaved, orders });
    }

    if (req.method === 'POST') {
      const amount = Math.min(5000, Math.max(10, Math.round(Number(req.body?.amount) || 0)));
      if (!amount) return res.status(400).json({ ok: false });
      const totalSaved = await kv.incrby('beggy:totalSaved', amount);
      const orders = await kv.incr('beggy:orders');
      return res.status(200).json({ ok: true, kv: true, totalSaved, orders });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  } catch (err) {
    return res.status(200).json({ ok: true, kv: false, totalSaved: 0, orders: 0 });
  }
}
