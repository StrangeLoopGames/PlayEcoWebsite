import { createFileRoute } from '@tanstack/react-router'
import Login from '../components/Login';
import { AuthenticatedUser } from "../utils/authentication";
import "../assets/_account.scss";
type LoginParams = {
  error: string | null;
  redirect: string | null;
}
export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, null>): LoginParams => {
    return {
      error: search.error,
      redirect: search.redirect,
    };
  },
  component: () => {
    document.title = 'Eco - Login';
    const {error,redirect} = Route.useSearch();
    if (!AuthenticatedUser()) {
      return (
        <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="login">
          <Login error={error} redirect={redirect} />
        </section>
      )
    } else {
      window.location.href = '/account';
    }
  }
});