import { createFileRoute } from '@tanstack/react-router'
import SteamRegister from '../components/SteamRegister';
import RegisterForm from '../components/Register';
import "../assets/_account.scss";
import { storeToken } from '../utils/authentication';
type SteamParams = {
  type: string | unknown;
  token: string | unknown;
}

export const Route = createFileRoute('/register')({
  validateSearch: (search: Record<string, unknown>): SteamParams => {
    return { type: search.type, token: search.token};
  },
  // validate search and return the url parameter of token using validateSearch
  component: () => {
    // get the token from search 
    const {type, token} = Route.useSearch();
    if(token !== undefined && token !== null && token !== "") {
      storeToken(token as string);
    }
    document.title = 'Eco - Register';

  return (
    <section className='d-flex col-lg-offset-2 col-lg-8 justify-content-center' id="login">
      {
        type == "steam" ? (
          <SteamRegister/>
        ) : (
          <RegisterForm/>
        )
      }
    </section>
  )
  }
})