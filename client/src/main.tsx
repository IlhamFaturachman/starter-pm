import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { config } from '@/config/env';
import { installMockApi } from '@/api/mock';
import './index.css';

if (config.useMock) installMockApi();

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
