import { createFileRoute, useSearch } from '@tanstack/react-router';
import "../assets/_account.scss";
import { ResetPassword } from '../components/ResetPassword';

type ResetPasswordProps = {
  token: string;
}

export const Route = createFileRoute('/resetpassword')({
  // Validate search and return the URL parameter of token using validateSearch
  validateSearch: (search: Record<string, unknown>): ResetPasswordProps => {
    return { token: search.token as string };
  },
  component: () => {
    document.title = 'Eco - Login';
    const {token} = Route.useSearch();
      return (
        <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="login">
          <ResetPassword token={token} />
        </section>
      )
  }
});