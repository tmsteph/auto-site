import Head from 'next/head';

export default function Home() {
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>My Auto-Improving Site</title>
        <meta name="description" content="This copy will evolve automatically 🤖" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
        <h1>Welcome to my evolving website! 🚀</h1>
        <blockquote><strong>Last AI update:</strong> {today}</blockquote>
        <p>This site rewrites itself daily using GPT-4o.</p>
        <p>
          Stay tuned for smarter copy, better design, and new experiments in how a site can grow on its own.
        </p>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            background: '#0070f3',
            color: 'white',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Join the journey
        </button>
      </main>
    </>
  );
}
