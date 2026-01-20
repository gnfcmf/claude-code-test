export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Webhook URL not configured' });
  }

  const message = req.query.message;

  if (!message) {
    return res.status(400).json({ error: 'Message parameter is required' });
  }

  try {
    const url = `${webhookUrl}?message=${encodeURIComponent(message)}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Webhook proxy error:', error);
    return res.status(500).json({ error: 'Failed to connect to backend' });
  }
}
