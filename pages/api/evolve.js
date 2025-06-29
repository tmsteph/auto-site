export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const response = await fetch('https://api.github.com/repos/tmsteph/auto-site/actions/workflows/auto-improve.yml/dispatches', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({ ref: 'main' }),
  });

  if (response.ok) {
    return res.status(200).json({ success: true });
  } else {
    const error = await response.text();
    console.error('GitHub dispatch error:', error);
    return res.status(500).json({ success: false, error });
  }
}
