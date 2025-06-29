import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [evolving, setEvolving] = useState(false);
  const [message, setMessage] = useState('');

  const handleEvolve = async () => {
    setEvolving(true);
    setMessage('Triggering evolution... 🧠');

    const res = await fetch('/api/evolve', { method: 'POST' });
    const data = await res.json();

    if (res.ok) {
      setMessage('✅ Evolution started! Changes will deploy in ~60 seconds.');
    } else {
      setMessage('❌ Error: ' + (data?.error || 'Unknown'));
    }

    setEvolving(false);
  };

  return (
    <>
      <Head>
        <title>My Auto-Improving Site</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome to my evolving website! 🚀</h1>
        <blockquote><strong>Last AI update:</strong> {new Date().toISOString().split('T')[0]}</blockquote>
        <p>This site rewrites itself daily using GPT-4o.</p>
        <p>Or evolve it now 👇</p>
        <button
          onClick={handleEvolve}
          disabled={evolving}
          style={{
            background: evolving ? '#aaa' : '#0070f3',
            color: 'white',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: evolving ? 'not-allowed' : 'pointer'
          }}
        >
          {evolving ? 'Evolving...' : 'Auto-Evolve Now'}
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </main>
    </>
  );
}
