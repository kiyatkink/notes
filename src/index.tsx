import { App } from 'app/App';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'app/ErrorBoundary';
import { StoreProvider } from 'app/StoreProvider';
import { ThemeProvider } from 'shared/lib/theme';
import { Suspense } from 'react';
import 'app/styles/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StoreProvider>
    <ThemeProvider>
      <Suspense fallback="">
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  </StoreProvider>,
);
