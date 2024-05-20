import { createFileRoute } from '@tanstack/react-router'
import Login from '../components/Login';
import { AuthenticatedUser } from "../utils/authentication";
import "../assets/_account.scss";
type LoginParams = {
  error: string | unknown;
}
export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginParams => {
    return {error: search.error};
  },
  component: () => {
    document.title = 'Eco - Login';
    const {error} = Route.useSearch();
    if (!AuthenticatedUser()) {
      return (
        <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="login">
          <Login error={error} />
        </section>
      )
    } else {
      window.location.href = '/account';
    }
  }
});