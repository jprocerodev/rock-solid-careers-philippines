
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loading...');
console.log('Current URL:', window.location.href);
console.log('Environment:', import.meta.env.MODE);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Root element not found');
}

console.log('Root element found:', rootElement);
console.log('Creating React root...');
const root = createRoot(rootElement);

try {
  console.log('Rendering App...');
  root.render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1 style="color: red;">Application Error</h1>
      <p>Please check the console for details and refresh the page.</p>
      <p style="font-size: 12px; color: #666;">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      <button onclick="window.location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
}
