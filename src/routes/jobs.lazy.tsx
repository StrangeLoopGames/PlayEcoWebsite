import { createLazyFileRoute } from '@tanstack/react-router'
document.title = 'Eco - Jobs';
export const Route = createLazyFileRoute('/jobs')({
  component: () => <div>Hello /jobs!</div>
})