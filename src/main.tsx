import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { NotFound } from './components/NotFound';
// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
  return (
  <NotFound />
  )
}, });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({});
export const App = () => {

  return (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);