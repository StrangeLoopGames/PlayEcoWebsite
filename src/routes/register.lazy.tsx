import { createFileRoute } from '@tanstack/react-router'
import SteamRegister from '../components/SteamRegister';
import RegisterForm from '../components/Register';
import "../assets/_account.scss";
import { storeToken } from '../utils/authentication';
type SteamParams = {
  refType: string | unknown;
  token: string | unknown;
}

export const Route = createFileRoute('/register')({
  validateSearch: (search: Record<string, unknown>): SteamParams => {
    return { refType: search.refType, token: search.token};
  },
  // validate search and return the url parameter of token using validateSearch
  component: () => {
    // get the token from search 
    const {refType, token} = Route.useSearch();
    if(token !== undefined && token !== null && token !== "") {
      storeToken(token as string);
    }
    document.title = 'Eco - Register';
        if(refType == "steam") {
          return (
            <SteamRegister/>  
          )
        } else {
          return (
            <RegisterForm/>  
          )
        }
  }
})