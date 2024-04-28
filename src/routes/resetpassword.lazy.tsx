import { createFileRoute } from '@tanstack/react-router'
import "../assets/_account.scss";

type ResetPasswordProps = {
  token: string;
}
export const Route = createFileRoute('/resetpassword')({
  // validate search and return the url parameter of token using validateSearch
  validateSearch: (search: Record<string, unknown>): ResetPasswordProps => {
    return { token: search.token as string };
  },
  // validateSearch: (search) => {
  //   const urlParams = new URLSearchParams(search);
  //   const token = urlParams.get('token');
  //   return { token };
  // },
  component: () => {
    // get the token from search 
    const {token} = Route.useSearch();
    document.title = 'Eco - Password Reset';
      return (
        <section className='col-lg-offset-2 col-lg-8' id="account">
          <h1>Password Reset from email!</h1>
          token: {token}
        </section>
      )
  }
})