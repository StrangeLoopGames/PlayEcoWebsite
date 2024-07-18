import { createLazyFileRoute } from '@tanstack/react-router'
import ForgotForm from '../components/Forgot';
import { AuthenticatedUser } from "../utils/authentication";
import "../assets/_account.scss";
export const Route = createLazyFileRoute('/forgot')({
  component: () => {
    document.title = 'Eco - Login';
    if (!AuthenticatedUser()) {
      return (
        <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="login">
          <ForgotForm />
        </section>
      )
    } else {
      window.location.href = '/account';
    }
  }
});