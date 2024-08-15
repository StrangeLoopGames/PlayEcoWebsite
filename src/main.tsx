import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { NotFound } from './components/NotFound';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({});

export const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

const container = document.getElementById('root') as HTMLElement & { _reactRootContainer?: any };
if (!container) {
  throw new Error('Root container missing in index.html');
}

let root;
if (!container._reactRootContainer) {
  root = ReactDOM.createRoot(container);
} else {
  root = container._reactRootContainer;
}

root.render(<App />);