import React, { useState, useEffect } from 'react';
import { STRIPE_PUBLIC_KEY, ANALYTICS_API_KEY, HARDCODED_JWT } from './config';
import { fetchCommentsInsecure } from './api';

function App() {
  const [rawHtmlComment, setRawHtmlComment] = useState('<b>Bienvenido</b> a la PoC Xygeni');
  const [serverComments, setServerComments] = useState([]);
  const [name, setName] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    localStorage.setItem('authToken', HARDCODED_JWT);
    console.log('Auth token guardado en localStorage sin cifrar:', HARDCODED_JWT);

    fetchCommentsInsecure()
      .then(data => setServerComments(data))
      .catch(err => {
        console.error('Error llamando a API insegura:', err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRawHtmlComment(rawHtmlComment + '<br/>' + name);
    setName('');
  };

  const handleShowDebugInfo = () => {
    setDebugInfo({
      stripePublicKey: STRIPE_PUBLIC_KEY,
      analyticsKey: ANALYTICS_API_KEY,
      jwt: HARDCODED_JWT,
      envApiKey: process.env.REACT_APP_PUBLIC_API_KEY,
      envSecret: process.env.REACT_APP_INTERNAL_SECRET
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>React VULN - Xygeni PoC</h1>
      <p>
        Esta aplicación contiene vulnerabilidades intencionadas. 
        No se debe usar en producción.
      </p>

      <section>
        <h2>Formulario de comentarios (XSS)</h2>
        <p>
          El contenido que escribas se renderiza como HTML sin ninguna validación.
          Esto permite inyectar código JavaScript, por ejemplo:
        </p>
        <code>{`<img src=x onerror="alert('XSS en React!')" />`}</code>

        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <input
            type="text"
            placeholder="Escribe HTML aquí..."
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '80%' }}
          />
          <button type="submit">Añadir comentario</button>
        </form>

        <div
          style={{
            marginTop: 20,
            padding: 10,
            border: '1px solid #ccc',
            minHeight: 50
          }}
          dangerouslySetInnerHTML={{ __html: rawHtmlComment }}
        />
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Comentarios desde API insegura (HTTP + token hardcodeado)</h2>
        <pre style={{ background: '#f5f5f5', padding: 10 }}>
          {JSON.stringify(serverComments, null, 2)}
        </pre>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Depuración de secretos (exposición de datos sensibles)</h2>
        <button onClick={handleShowDebugInfo}>Mostrar información sensible</button>
        {debugInfo && (
          <pre style={{ background: '#ffeeee', padding: 10, marginTop: 10 }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </section>
    </div>
  );
}

export default App;
