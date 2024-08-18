import { createFileRoute, redirect } from '@tanstack/react-router';
import UserCard from '../../components/account/UserCard';
import SteamCard from '../../components/account/SteamCard';
import DownloadsCard from '../../components/account/DownloadsCard';
import TermsCard from '../../components/account/TermsCard';
import ArtCard from '../../components/account/ArtCard';
import TransactionsCard from '../../components/account/TransactionsCard';
import { AuthenticatedUser, useUserQuery } from "../../utils/authentication";
import "../../assets/_account.scss";
import { Modal } from '../../components/Modal';
import InviteCard from '../../components/account/InviteCard';
import TwitchCard from '../../components/account/TwitchCard';
import { useState } from 'react';

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
    if (!AuthenticatedUser()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: search.redirect != null ? search.redirect : location.href,
        },
      })
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
  const { data: user, error: userError, isLoading } = useUserQuery(userJWT as string);
  if (isLoading) return <Modal type="Loading" message="Please wait while we load your account information." />;
  if (userError && userError != null) {
    return <Modal type="Error" message={error.message} data={undefined} />
  }
  console.log(error);
  function sendVerificationEmail() {
    const url = `${import.meta.env.VITE_CLOUD_API_URL}api/Registration/RequestVerifyEmail`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJWT}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
              setAlert("Verification email sent");
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
  }
  return (
    <>
    { alert ? (
      <p className="alert alert-warning">{alert}</p>
    ) : null
    }
    {
    error ? (
        <p className="alert alert-danger">{
          error == "twitch_callback_error" ? 
          "There was an issue connecting your twitch"
          :
          error}</p>
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