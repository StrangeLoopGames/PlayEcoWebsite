import { createLazyFileRoute } from '@tanstack/react-router'
document.title = 'Eco - Contact';
export const Route = createLazyFileRoute('/contact')({
  component: () => <div>Hello /contact!</div>
})