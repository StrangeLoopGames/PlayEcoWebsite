import { createFileRoute, redirect } from '@tanstack/react-router';
import UserCard from '../../components/account/UserCard';
import SteamCard from '../../components/account/SteamCard';
import DownloadsCard from '../../components/account/DownloadsCard';
import TermsCard from '../../components/account/TermsCard';
import ArtCard from '../../components/account/ArtCard';
import TransactionsCard from '../../components/account/TransactionsCard';
import { AuthenticatedUser, removeToken, storeToken, useUserQuery } from "../../utils/authentication";
import "../../assets/_account.scss";
import { Modal } from '../../components/Modal';
import InviteCard from '../../components/account/InviteCard';
import TwitchCard from '../../components/account/TwitchCard';
import { useState } from 'react';
import ServerCard from '../../components/account/ServerCard';
import { alertsMap } from '../../data/alerts';

type AccountParams = {
  refType: string | null;
  token: string | null;
  redirect: string | null;
  product: string | null;
  error: string | null;
}
export const Route = createFileRoute('/account/')({
  validateSearch: (search: Record<string, unknown>): AccountParams => {
    return { 
      refType: search.type as string, 
      token: search.token as string, 
      redirect: search.redirect as string, 
      product: search.pid as string,
      error: search.error as string
    };
  },
  beforeLoad: async ({ location, search }) => {
    const searchParams = new URLSearchParams(location.hash);
    const accessToken = searchParams.get('access_token');
    if (!AuthenticatedUser()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: search.redirect != null ? search.redirect : location.href,
        },
      })
    }
    if (accessToken) {
      console.log('Linking Steam');
      const userJWT = AuthenticatedUser();
      fetch(`${import.meta.env.VITE_CLOUD_API_URL}UserAccount/AddSteamToSlgUser?token=${accessToken}`, {
        headers: {
          Authorization: `Bearer ${userJWT}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          return res.json().then(errorResponse => {
            location.href = `/account?error=${errorResponse.message}`;
          });
          } else {
            // if token object in response, store it
            return res.json().then(data => {
              window.history.replaceState({}, document.title, "/account");
              storeToken(data.token);
              location.href = '/account?success="Steam linked successfully!"';
            });
          }
      }).catch((error) => {
        console.log(error);
        
        location.href = `/account?error=${error}`;
      });
    }
  },
  component: () => {
    document.title = 'Eco - Account';
    return (
      <section className='page-wrap-main col-lg-offset-2 col-lg-8' id="account">
        <Account />
      </section>
    )
  }
  })


function Account() {
  const [alert , setAlert] = useState<string | null>(null);
  const {error, redirect, product, token, refType} = Route.useSearch();
  const userJWT = (AuthenticatedUser()) ? AuthenticatedUser() : '';
  const { data: user, error: userError, isLoading } = useUserQuery(userJWT as string, true);
  if (isLoading) return <Modal type="Loading" message="Please wait while we load your account information." />;
  if (userError && userError != null) {
    return <Modal type="Error" message={error.message} data={undefined} />
  }
  return (
    <>
    { alert ? (
      <p className="alert alert-warning">{alert}</p>
    ) : null
    }
    
    {
    error ? (
        <p className="alert alert-danger">{alertsMap[error as string]}</p>
      ) : null
    }
      <UserCard user={user} />
      <DownloadsCard user={user} />
      <InviteCard user={user} />
      <TransactionsCard user={user} />
      <SteamCard user={user} />
      <TwitchCard user={user} />
      <ArtCard />
      <TermsCard />
    </>
  )
}