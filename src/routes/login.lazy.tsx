import { createLazyFileRoute } from '@tanstack/react-router'
import Login from '@/components/Login';
import { AuthenticatedUser } from "@/utils/authentication";
export const Route = createLazyFileRoute('/login')({
  component: () => {
    document.title = 'Eco - Login';
    if (!AuthenticatedUser()) {
      return (
        <section className='col-lg-offset-2 col-lg-8' id="login">
          <Login />
        </section>
      )
    } else {
      window.location.href = '/account';
    }
  }
});