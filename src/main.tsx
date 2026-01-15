// @ts-expect-error: Missing types
import '@fontsource/geist';
// @ts-expect-error: Missing types
import '@fontsource/geist-mono';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
