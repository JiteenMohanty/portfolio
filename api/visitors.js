import { kv } from '@vercel/kv'

const KEY = 'portfolio:visitors'

// GET  -> read the current count without incrementing.
// POST -> atomically increment (called once per visitor, gated client-side
//         by a localStorage flag so repeat visits don't inflate the count).
export default async function handler(req, res) {
  try {
    const count = req.method === 'POST' ? await kv.incr(KEY) : ((await kv.get(KEY)) ?? 0)
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ count })
  } catch {
    return res.status(500).json({ error: 'visitor count unavailable' })
  }
}
