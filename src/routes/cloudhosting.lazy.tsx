import { createLazyFileRoute } from '@tanstack/react-router'
document.title = 'Eco - Cloud Hosting';
export const Route = createLazyFileRoute('/cloudhosting')({
  component: () => <div>Hello /cloudhosting!</div>
})