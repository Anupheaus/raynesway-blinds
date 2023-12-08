import { createRoot } from 'react-dom/client';
import { App } from './App';


const rootElement = document.getElementsByTagName('root').item(0);
if (rootElement == null) throw new Error('Root element not found');
const root = createRoot(rootElement);
root.render(<App />);