import { createLazyFileRoute } from '@tanstack/react-router'
import Register from '@/components/Register';
import { AuthenticatedUser } from "@/utils/authentication";
export const Route = createLazyFileRoute('/register')({
  component: () => {
    document.title = 'Eco - Login';
    if (!AuthenticatedUser()) {
      return (
        <section className='col-lg-offset-2 col-lg-8' id="login">
          <Register />
        </section>
      )
    } else {
      window.location.href = '/account';
    }
  }
});